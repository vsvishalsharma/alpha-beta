import{ CSSProperties } from 'react';
import { PredefinedQuery } from '../types';

interface PredefinedQueriesProps {
  queries: PredefinedQuery[];
  onSelectQuery: (query: string) => void;
}

export const PredefinedQueries = ({ queries, onSelectQuery }: PredefinedQueriesProps) => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '16rem',
      borderRight: '1px solid #e5e7eb',
      backgroundColor: 'white',
      padding: '1rem'
    },
    heading: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#4b5563',
      marginBottom: '1rem'
    },
    queriesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    queryItem: {
      padding: '0.75rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    queryItemHover: {
      backgroundColor: '#f3f4f6'
    },
    queryName: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#111827'
    },
    queryDescription: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Predefined Queries</h2>
      <div style={styles.queriesContainer}>
        {queries.map((query, index) => (
          <div
            key={index}
            style={styles.queryItem}
            onClick={() => onSelectQuery(query.query)}
          >
            <h3 style={styles.queryName}>{query.name}</h3>
            <p style={styles.queryDescription}>{query.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredefinedQueries;