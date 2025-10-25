import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { io } from 'socket.io-client';
import { getBoard, saveBoard } from '../../../api/whiteboardApi';
import Spinner from '../../../components/common/Spinner';
import { useToast } from '../../../components/common/Toast';

const socket = io('/rooms');

function useDebounce(fn, delay) {
  const timeoutRef = useRef(null);
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fn(...args), delay);
  };
}

const WhiteboardTab = ({ roomId, currentUser, isAdmin }) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const excalidrawAPIRef = useRef(null);
  const programmaticRef = useRef(false);
  const toast = useToast();

  // Join socket room
  useEffect(() => {
    socket.emit('join', { roomId });
    return () => socket.emit('leave', { roomId });
  }, [roomId]);

  // Fetch initial board state
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await getBoard(roomId);
        if (mounted) setInitialData(data || undefined);
      } catch (e) {
        toast.show('Failed to load whiteboard', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [roomId, toast]);

  // Listen for remote updates
  useEffect(() => {
    const handler = ({ elements, appState }) => {
      if (!excalidrawAPIRef.current) return;
      programmaticRef.current = true;
      excalidrawAPIRef.current.updateScene({ elements, appState });
    };
    socket.on('whiteboard:update', handler);
    return () => socket.off('whiteboard:update', handler);
  }, []);

  const debouncedSave = useMemo(
    () =>
      useDebounce(async (elements, appState) => {
        try {
          await saveBoard(roomId, { elements, appState });
        } catch (e) {
          // Silent fail to avoid spam; consider showing a throttled toast
        }
      }, 2000),
    [roomId]
  );

  const handleChange = (elements, appState) => {
    if (programmaticRef.current) {
      programmaticRef.current = false;
      return;
    }
    socket.emit('whiteboard:draw', { roomId, elements, appState });
    debouncedSave(elements, appState);
  };

  const handleClear = () => {
    if (!excalidrawAPIRef.current) return;
    excalidrawAPIRef.current.resetScene();
    const empty = { elements: [], appState: {} };
    socket.emit('whiteboard:draw', { roomId, ...empty });
    debouncedSave([], {});
  };

  if (loading) return <Spinner />;

  return (
    <div className="h-[70vh] border rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center p-2 bg-bg">
        <div className="text-sm text-muted">Collaborative Whiteboard</div>
        {isAdmin && (
          <button className="btn btn-danger btn-sm" onClick={handleClear}>
            Clear Board
          </button>
        )}
      </div>
      <Excalidraw
        ref={excalidrawAPIRef}
        initialData={initialData}
        onChange={handleChange}
      />
    </div>
  );
};

export default WhiteboardTab;
