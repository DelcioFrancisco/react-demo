import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Opportunity {
  id: number;
  nameCompany: string;
  description: string;
  valueCompany: number;
}

const OpportunitiesListPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

useEffect(() => {
  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.get<Opportunity[]>('http://localhost:8080/opportunities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpportunities(response.data);
      
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    }
  };

  fetchOpportunities();
}, []);

  return (
    <div style={styles.container}>
      <h2>Opportunities</h2>
      {opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Description</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id}>
                <td>{opp.id}</td>
                <td>{opp.nameCompany}</td>
                <td>{opp.description}</td>
                <td>${opp.valueCampany?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    backgroundColor: '#f5f5f5',
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    borderBottom: '1px solid #eee',
  },
};

export default OpportunitiesListPage;
