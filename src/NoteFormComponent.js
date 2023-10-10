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
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Add a Note"
            style={{ width: '630px', height: '40px', resize: 'none' }} // Set the height using inline style
          ></textarea>
        </div>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}

export default NoteFormComponent;



