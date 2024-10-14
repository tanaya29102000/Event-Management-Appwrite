import React, { useState } from 'react';
import { database } from './appwrite'; 
import Swal from 'sweetalert2';  // Import SweetAlert2
import './CreateEvent.css';  // Your custom CSS

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    EventName: '',
    EventID: '',
    EventDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await database.createDocument(
        '670d22d800337466ac49',    // Database ID
        '670d22ec00302b8d5199',    // Collection ID
        'unique()',                // Auto-generated ID
        formData
      );

      // SweetAlert success message
      Swal.fire({
        title: 'Success!',
        text: 'Event added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setFormData({ EventName: '', EventID: '', EventDate: '' });
    } catch (error) {
      console.error('Error adding event:', error);

      // SweetAlert error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add event.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="EventName"
          placeholder="Event Name"
          value={formData.EventName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="EventID"
          placeholder="Event ID"
          value={formData.EventID}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="EventDate"
          value={formData.EventDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
