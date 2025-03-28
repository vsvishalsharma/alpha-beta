import { CSSProperties } from 'react';

export const Footer = () => {
  const styles: { [key: string]: CSSProperties } = {
    footer: {
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      padding: '1rem',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50
    },
    text: {
      color: '#6b7280',
      fontSize: '0.875rem',
      fontWeight: 500
    }
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Thanks for the opportunity, Atlan Team! 🙏
      </p>
    </footer>
  );
};

export default Footer;