import { CSSProperties } from 'react';
import { History } from 'lucide-react';

interface QueryHistoryProps {
  queries: string[];
  onSelectQuery: (query: string) => void;
}

export const QueryHistory = ({ queries, onSelectQuery }: QueryHistoryProps) => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333'
    },
    headerIcon: {
      marginRight: '10px'
    },
    subtitle: {
      fontSize: '17px',
      color: '#666',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    noQueries: {
      color: '#999',
      textAlign: 'center',
      padding: '20px'
    },
    queriesList: {
      maxHeight: '300px',
      overflowY: 'auto'
    },
    queryItem: {
      padding: '10px',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer'
    },
    queryItemHover: {
      backgroundColor: '#f5f5f5'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <History style={styles.headerIcon} />
        Query History
      </div>
      
      <div style={styles.subtitle}>
        Only Stores Unique Queries
      </div>
      
      {queries.length === 0 ? (
        <div style={styles.noQueries}>
          No queries executed yet
        </div>
      ) : (
        <div style={styles.queriesList}>
          {queries.map((query, index) => (
            <div 
              key={index} 
              style={styles.queryItem}
              onClick={() => onSelectQuery(query)}
            >
              {query.substring(0, 50)}...
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryHistory;