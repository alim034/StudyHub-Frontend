import React, { useEffect, useRef, useState } from 'react';
import { Send, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatPanel({ socket, roomId, displayName }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const onMsg = (m) => setMessages((prev) => [...prev, m]);
    socket.on('chat-message', onMsg);
    return () => socket.off('chat-message', onMsg);
  }, [socket]);

  useEffect(() => {
    if (isAtBottom) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    } else {
      setHasNew(true);
    }
  }, [messages.length, isAtBottom]);

  const onScroll = () => {
    const el = listRef.current; if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    setIsAtBottom(nearBottom);
    if (nearBottom) setHasNew(false);
  };

  const scrollToBottom = () => {
    const el = listRef.current; if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    const el = listRef.current; if (!el) return;
    el.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg = { roomId, text: trimmed, name: displayName, at: Date.now() };
    socket.emit('chat-message', msg);
    setMessages((m) => [...m, { ...msg, self: true }]);
    setText('');
  };

  return (
    <div className="h-full flex flex-col min-h-0 relative">
      <div className="px-4 py-3 border-b border-white/20 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        <span className="font-semibold">In-call messages</span>
      </div>
      <div ref={listRef} onScroll={onScroll} className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] rounded-lg px-3 py-2 ${m.self ? 'ml-auto bg-white text-[#0ABAB5]' : 'bg-white/10'}`}
          >
            {!m.self && <div className="text-xs text-white/70 mb-1">{m.name}</div>}
            <div className={`${m.self ? 'text-[#0ABAB5]' : 'text-white'}`}>{m.text}</div>
            <div className="text-[10px] text-white/60 mt-1">{new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </motion.div>
        ))}
      </div>
      {/* Scroll controls */}
      <div className="absolute right-3 top-20 flex flex-col gap-2">
        <button onClick={scrollToTop} title="Scroll to top" className="p-2 rounded-full bg-black/30 border border-white/15 hover:bg-black/50 transition-colors">
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
      {!isAtBottom && (
        <button onClick={scrollToBottom} title="Scroll to bottom" className="absolute right-3 bottom-20 px-2 py-1 rounded-full bg-[#0ABAB5] text-black text-xs shadow border border-white/10 flex items-center gap-1">
          <ChevronDown className="w-4 h-4" />
          {hasNew ? 'New messages' : 'Bottom'}
        </button>
      )}
      <div className="p-3 border-t border-white/20">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Send a message"
            className="flex-1 resize-none rounded-md bg-white/10 border border-white/20 px-3 py-2 focus:outline-none max-h-28 min-h-[40px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button onClick={send} className="px-3 py-2 rounded-md bg-white text-[#0ABAB5] hover:bg-[#56DFCF] hover:text-white transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}