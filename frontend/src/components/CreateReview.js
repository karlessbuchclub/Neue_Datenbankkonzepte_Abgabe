import React, { useState } from 'react';
import axios from 'axios';

function CreateReview() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);

  const handleFileChange = (e) => {
    setMedia(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    for (let i = 0; i < media.length; i++) {
      formData.append('media', media[i]);
    }

    try {
      const response = await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Review created:', response.data);
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review here"
        rows="4"
        cols="50"
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default CreateReview;
