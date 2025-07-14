import React, { useState } from 'react';

interface OpportunityFormData {
  name_company: string;
  description: string;
  value_company: number | '';
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<OpportunityFormData>({
    name_company: '',
    description: '',
    value_company: '',
  });

  const [message, setMessage] = useState<string | null>(null);

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

    if (!formData.name_company || !formData.description) {
      setMessage('Please fill in all required fields.');
      return;
    }

    console.log('Submitted opportunity:', formData);
    setMessage('Opportunity submitted successfully.');

    setFormData({
      name_company: '',
      description: '',
      value_company: '',
    });
  };

  return (
    <div style={styles.container}>
      <h2>Create Opportunity</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name_company"
          placeholder="Company Name"
          value={formData.name_company}
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
          name="value_company"
          placeholder="Value (e.g. 1000.00)"
          value={formData.value_company}
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
