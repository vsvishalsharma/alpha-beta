import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Save } from 'lucide-react';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { QueryHistory } from './components/QueryHistory';
import { ResultsTable } from './components/ResultsTable';
import { PredefinedQueries } from './components/PredefinedQueries';
import { Footer } from './components/Footer';
import { 
  categories_csv, 
  customers_csv, 
  shippers_csv, 
  suppliers_csv 
} from './data/csvData';
import { PredefinedQuery, Notification as NotificationType } from './types';

const predefinedQueries: PredefinedQuery[] = [
  {
    name: 'Get All Customers',
    description: 'Retrieves all customer records',
    query: 'SELECT * FROM customers;',
    csvData: customers_csv
  },
  {
    name: 'Get All Categories',
    description: 'Retrieves all product categories',
    query: 'SELECT * FROM categories;',
    csvData: categories_csv
  },
  {
    name: 'Get All Shippers',
    description: 'Retrieves all shipping company records',
    query: 'SELECT * FROM shippers;',
    csvData: shippers_csv
  },
  {
    name: 'Get All Suppliers',
    description: 'Retrieves all supplier records',
    query: 'SELECT * FROM suppliers;',
    csvData: suppliers_csv
  },
];

function App() {
  const [currentQuery, setCurrentQuery] = useState('SELECT * FROM customers;');
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [queriedTable, setQueriedTable] = useState<string | undefined>(undefined);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const executeQuery = (query: string, showSuccess = true) => {
    setLoading(true);
    const matchedQuery = predefinedQueries.find(q => q.query.trim() === query.trim());
    
    if (!queryHistory.includes(query)) {
      setQueryHistory(prev => [query, ...prev]);
    }
    
    setTimeout(() => {
      if (matchedQuery) {
        // Extract table name from query (simple implementation)
        const tableMatch = query.match(/FROM\s+(\w+)/i);
        const tableName = tableMatch ? tableMatch[1].toLowerCase() : undefined;
        
        setQueriedTable(tableName);
        
        if (showSuccess) {
          showNotification('success', 'Query executed successfully');
        }
      } else {
        // Default to customers if no match
        setQueriedTable('customers');
        
        if (showSuccess) {
          showNotification('success', 'Query executed successfully');
        }
      }
      setLoading(false);
    }, 500);
  };

  const handleExecuteQuery = () => {
    executeQuery(currentQuery, true);
  };

  const handleSaveQuery = () => {
    showNotification('success', 'Query saved successfully');
  };

  const handleHistorySelect = (query: string) => {
    setCurrentQuery(query);
  };

  useEffect(() => {
    executeQuery(currentQuery, false);
  }, []);

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column' as const
    },
    mainContainer: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden'
    },
    sidebarWidth: {
      width: '256px',
      flexShrink: 0,
      overflowY: 'auto' as const
    },
    editorContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      minWidth: 0
    },
    editorWrapper: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%'
    },
    editorBox: {
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    buttonContainer: {
      marginTop: '1rem',
      display: 'flex',
      gap: '0.5rem'
    },
    executeButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      color: 'white',
      backgroundColor: loading ? '#3b82f6' : '#2563eb',
      cursor: loading ? 'not-allowed' : 'pointer'
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    resultsContainer: {
      flex: 1,
      overflow: 'auto'
    },
    resultsBox: {
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      backgroundColor: 'white',
      height: '100%'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '12rem'
    },
    loadingSpinner: {
      animation: 'spin 1s linear infinite',
      borderRadius: '9999px',
      height: '2rem',
      width: '2rem',
      borderBottomWidth: '2px',
      borderBottomColor: '#3b82f6'
    },
    resultTableContainer: {
      overflow: 'auto',
      maxHeight: 'calc(100vh - 600px)'
    }
  };

  return (
    <div style={styles.appContainer}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Header />

      <div style={styles.mainContainer}>
        <div style={styles.sidebarWidth}>
          <PredefinedQueries
            queries={predefinedQueries}
            onSelectQuery={setCurrentQuery}
          />
        </div>

        <div style={styles.editorContainer}>
          <div style={styles.editorWrapper}>
            <div style={{marginBottom: '1rem', flexShrink: 0}}>
              <div style={styles.editorBox}>
                <Editor
                  height="300px"
                  defaultLanguage="sql"
                  theme="vs-light"
                  value={currentQuery}
                  onChange={(value) => setCurrentQuery(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 },
                  }}
                />
              </div>
              <div style={styles.buttonContainer}>
                <button
                  onClick={handleExecuteQuery}
                  disabled={loading}
                  style={styles.executeButton}
                >
                  <Play style={{height: '1rem', width: '1rem', marginRight: '0.5rem'}} />
                  {loading ? 'Executing...' : 'Execute Query'}
                </button>
                <button
                  onClick={handleSaveQuery}
                  style={styles.saveButton}
                >
                  <Save style={{height: '1rem', width: '1rem', marginRight: '0.5rem'}} />
                  Save Query
                </button>
              </div>
            </div>

            <div style={styles.resultsContainer}>
              <div style={styles.resultsBox}>
                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.loadingSpinner}></div>
                  </div>
                ) : (
                  <div style={styles.resultTableContainer}>
                    <ResultsTable 
                      displayMode="csv" 
                      queriedTable={queriedTable} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.sidebarWidth}>
          <QueryHistory
            queries={queryHistory}
            onSelectQuery={handleHistorySelect}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;