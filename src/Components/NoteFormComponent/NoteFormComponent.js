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
      const response = await axios.post('http://localhost:8080/api/v1/notes', { content, userid });
      console.log('Note added successfully:', response.data);

      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleRemoveNote = async (noteid) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/notes/${noteid}`);
      console.log('Note removed successfully:', noteid);

      handleGetAllNotes();
    } catch (error) {
      console.error('Error removing note:', error);
    }
  };

  const handleGetAllNotes = async () => {
    try {
      // const response = await axios.get(`http://localhost:8080/api/v1/notes/${userid}`);
      const response = await axios.get(`http://localhost:8080/api/v1/notes`);
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
            style={{ marginLeft: '10px', width: '850px', height: '50px', resize: 'none' }}
          />
          <button type="submit" style={{ marginLeft: '10px'}}>
            Save Note
          </button>
        </div>
      </form>

      <div className="notes-wrapper">
        <h2>My Notes:</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <button style={{ marginRight: '10px'}} onClick={() => handleRemoveNote(note.id)}>Remove</button>
              <span style={{ color: 'darkblue' }}>{`Content: ${note.content}`}</span>
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