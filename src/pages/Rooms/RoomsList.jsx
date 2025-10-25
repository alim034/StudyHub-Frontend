/**
 * RoomsList.jsx
 * - Responsive grid of room cards.
 * - Floating "Create Room" button opens modal.
 * - Each card: room name, members, actions.
 */

import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Avatar from "../../components/common/Avatar";
import { getRooms } from "../../api/roomsApi";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getRooms().then(data => setRooms(data));
  }, []);

  return (
    <main className="app-container py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <Card key={room._id} header={room.name}>
            <div className="mb-2 text-muted">{room.description}</div>
            <div className="flex gap-2 mb-2">
              {room.members.slice(0, 5).map(m => (
                <Avatar key={m._id} src={m.profilePic} size="sm" alt={m.name} />
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-2">
              Invite Code
            </Button>
          </Card>
        ))}
      </div>
      <Button
        variant="primary"
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
        onClick={() => setModalOpen(true)}
        aria-label="Create Room"
      >
        +
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* Room creation form here */}
        <div className="text-center">Room creation form coming soon!</div>
      </Modal>
    </main>
  );
};

export default RoomsList;