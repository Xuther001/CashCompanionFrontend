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

    // Load existing notes initially
    // handleGetAllNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://34.220.129.67:8080/api/v1/notes', { content, userid });
      console.log('Note added successfully:', response.data);

      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleRemoveNote = async (noteId) => {
    try {
      await axios.delete(`http://34.220.129.67:8080/api/v1/notes/${noteId}`);
      console.log('Note removed successfully:', noteId);

      handleGetAllNotes();
    } catch (error) {
      console.error('Error removing note:', error);
    }
  };

  const handleGetAllNotes = async () => {
     // Make an HTTP GET request to fetch notes by username
     fetch(`http://34.220.129.67:8080/api/v1/notes/user/${userid}`)
     .then(response => response.json())
     .then(data => setNotes(data))
     .catch(error => {
         console.error('Error fetching notes:', error);
     });
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
            <li key={note.id}>
              <button onClick={() => handleRemoveNote(note.id)}>Remove</button>
              {`Content: ${note.content}`}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleGetAllNotes} style={{ marginLeft: '10px' }}>
        Get All Notes
      </button>
    </div>
  );
}

export default NoteFormComponent;