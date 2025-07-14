import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsertTokenPage: React.FC = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      alert('Please enter a token');
      return;
    }

    localStorage.setItem('accessToken', token);
    navigate('/list'); 
  };

  return (
    <div style={styles.container}>
      <h2>Insert Bearer Token</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your Bearer token here"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Save Token & Continue
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textarea: {
    minHeight: '100px',
    padding: '10px',
    fontSize: '14px',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default InsertTokenPage;
