// frontend/src/pages/Rooms/components/CalendarTab.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../../api/eventsApi';
import Modal from '../../common/Modal';
import Spinner from '../../common/Spinner';
import Toast from '../../common/Toast';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const CalendarTab = ({ roomId, currentUser }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchEvents = useCallback(async (range) => {
    setLoading(true);
    try {
      const from = range.start.toISOString();
      const to = range.end.toISOString();
      const res = await getEvents(roomId, from, to);
      setEvents(res.data.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      })));
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to load events' });
    }
    setLoading(false);
  }, [roomId]);

  useEffect(() => {
    // Initial fetch for current month
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = new Date(start);
    end.setDate(end.getDate() + 35);
    fetchEvents({ start, end });
  }, [fetchEvents]);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    setLoading(true);
    try {
      if (selectedEvent._id) {
        await updateEvent(roomId, selectedEvent._id, data);
        setToast({ type: 'success', message: 'Event updated' });
      } else {
        await createEvent(roomId, data);
        setToast({ type: 'success', message: 'Event created' });
      }
      setModalOpen(false);
      fetchEvents({ start: selectedEvent.start, end: selectedEvent.end });
    } catch (err) {
      setToast({ type: 'error', message: 'Error saving event' });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEvent(roomId, selectedEvent._id);
      setToast({ type: 'success', message: 'Event deleted' });
      setModalOpen(false);
      fetchEvents({ start: selectedEvent.start, end: selectedEvent.end });
    } catch (err) {
      setToast({ type: 'error', message: 'Error deleting event' });
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      {loading && <Spinner />}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onRangeChange={fetchEvents}
        views={['month', 'week', 'day']}
      />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {/* Render form for create/edit, show delete if authorized */}
          {/* ...form fields for title, description, start, end... */}
          {/* ...buttons for save, delete (if authorized)... */}
        </Modal>
      )}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default CalendarTab;