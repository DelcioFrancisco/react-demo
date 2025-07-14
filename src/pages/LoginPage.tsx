import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginForm {
  user: string;
  password: string;
}

interface Token {
  token: string
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ user: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState<Token>({ token: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const fetchLogin = async () => {
  try {
    const response = await axios.post<Token>(
        'http://localhost:8080/auth/login',
  {
    login: form.user,
    password: form.password,
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
    );

    setLogin(response.data);
    localStorage.setItem('accessToken', response.data.token);
    console.log(`Token: ${response.data.token}`);
    navigate('/token');
  } catch (error) {
    console.error('Failed to fetch token:', error);
    setError('Login failed. Please try again.');
  }
};


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!form.user || !form.password) {
    setError('Both fields are required.');
    return;
  }

  console.log('Logging in with', form);

  fetchLogin(); 
};

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={form.user}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #aaa',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
};

export default LoginPage;
