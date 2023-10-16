import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteFormComponent.css';

function NoteFormComponent() {
  const [content, setContent] = useState('');
  const [userid, setUserId] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Retrieve the userId from local storage
    const storedUserId = localStorage.getItem('username');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Load existing notes
    handleGetAllNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://35.91.130.145:8080/api/v1/notes', { content, userid });
      console.log('Note added successfully:', response.data);

      setContent('');
      handleGetAllNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleGetAllNotes = async () => {
    try {
      // Include the 'userid' in the URL to retrieve notes for a specific user
      // const response = await axios.get(`http://localhost:8080/api/v1/notes/user/${userid}`);
      const response = await axios.get(`http://35.91.130.145:8080/api/v1/notes/user/${userid}`);
      // const response = await axios.get(`http://localhost:8080/api/v1/notes`); a
      console.log('All notes:', response.data);
      setNotes(response.data);
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };

  return (
    <div className="note-container">
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Add a Note"
            style={{ width: '630px', height: '40px', resize: 'none' }}
          />
          <button type="submit" style={{ marginLeft: '10px' }}>
            Save Note
          </button>
        </div>
      </form>

      <div className="notes-wrapper">
        <h2>My Notes:</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NoteFormComponent;