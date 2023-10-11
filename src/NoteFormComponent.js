import React, { useState } from 'react';
import axios from 'axios';

function NoteFormComponent() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/notes', { content });
      console.log('Note added successfully:', response.data);

      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default NoteFormComponent;



