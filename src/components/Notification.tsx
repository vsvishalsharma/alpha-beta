import { CSSProperties } from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 50,
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white'
    },
    message: {
      flex: 1
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '0',
      display: 'flex',
      alignItems: 'center'
    },
    closeIcon: {
      height: '1rem',
      width: '1rem',
      transition: 'opacity 0.2s'
    },
    closeButtonHover: {
      opacity: 0.8
    }
  };

  return (
    <div style={styles.container}>
      <span style={styles.message}>{message}</span>
      <button
        onClick={onClose}
        style={styles.closeButton}
      >
        <X style={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Notification;