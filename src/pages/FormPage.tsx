import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface OpportunityFormData {
  nameCompany: string;
  description: string;
  valueCompany: number | '';
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<OpportunityFormData>({
    nameCompany: '',
    description: '',
    valueCompany: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const addOpportunity = async () => {
    try {
    const response = await axios.post<any>(
        'http://localhost:8080/opportunities',
{
	nameCompany: formData.nameCompany,
  description: formData.description,
  valueCompany: formData.valueCompany
},
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    }
  }
    );
    //setLogin(response.data);
    navigate('/list');
  } catch (error) {
    console.error('Failed to fetch token:', error);
    //setError('Login failed. Please try again.');
  }
  } 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'value_company' ? parseFloat(value) || '' : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.nameCompany || !formData.description) {
      setMessage('Please fill in all required fields.');
      return;
    }

    console.log('Submitted opportunity:', formData);
    addOpportunity();
    setMessage('Opportunity submitted successfully.');

    setFormData({
      nameCompany: '',
      description: '',
      valueCompany: '',
    });

    navigate('/list');
  };

  return (
    <div style={styles.container}>
      <h2>Create Opportunity</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nameCompany"
          placeholder="Company Name"
          value={formData.nameCompany}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <input
          type="number"
          name="valueCompany"
          placeholder="Value (e.g. 1000.00)"
          value={formData.valueCompany}
          onChange={handleChange}
          style={styles.input}
          step="0.01"
        />
        {message && <p style={styles.message}>{message}</p>}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '400px',
    margin: '50px auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '80px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
  },
};

export default FormPage;
