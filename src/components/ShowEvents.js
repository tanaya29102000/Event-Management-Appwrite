
import React, { useState, useEffect } from 'react';
import { database } from './appwrite';
import Swal from 'sweetalert2';  // Import SweetAlert2
import './ShowEvents.css';  // Your custom CSS

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    EventName: '',
    EventID: '',
    EventDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.listDocuments(
          '670d22d800337466ac49', // Database ID
          '670d22ec00302b8d5199'  // Collection ID
        );
        setEvents(response.documents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await database.deleteDocument('670d22d800337466ac49', '670d22ec00302b8d5199', id);
        setEvents(events.filter((event) => event.$id !== id));
        Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting event:', error);
        Swal.fire('Error!', 'Failed to delete event.', 'error');
      }
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.$id);
    setEditFormData({
      EventName: event.EventName,
      EventID: event.EventID,
      EventDate: event.EventDate,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await database.updateDocument(
        '670d22d800337466ac49',
        '670d22ec00302b8d5199',
        editingId,
        editFormData
      );
      Swal.fire('Updated!', 'Your event has been updated.', 'success');
      setEvents(events.map((event) =>
        event.$id === editingId ? { ...event, ...editFormData } : event
      ));
      setEditingId(null);
      setEditFormData({ EventName: '', EventID: '', EventDate: '' });
    } catch (error) {
      console.error('Error updating event:', error);
      Swal.fire('Error!', 'Failed to update event.', 'error');
    }
  };

  return (
    <div className="show-event-container">
      <h2>Event List</h2>
      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event ID</th>
            <th>Event Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.$id}>
              <td>{event.EventName}</td>
              <td>{event.EventID}</td>
              <td>{event.EventDate}</td>
              <td>
                <button onClick={() => handleEditClick(event)}>Edit</button>
                <button onClick={() => handleDelete(event.$id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="edit-form-container">
          <h3>Edit Event</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="EventName"
              value={editFormData.EventName}
              onChange={handleEditChange}
              required
            />
            <input
              type="text"
              name="EventID"
              value={editFormData.EventID}
              onChange={handleEditChange}
              required
            />
            <input
              type="date"
              name="EventDate"
              value={editFormData.EventDate}
              onChange={handleEditChange}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShowEvents;
