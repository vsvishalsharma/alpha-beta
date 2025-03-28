import { CSSProperties } from 'react';
import { Github, BookOpen } from 'lucide-react';

export const Header = () => {
  const styles: { [key: string]: CSSProperties } = {
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0.75rem 1rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logo: {
      borderRadius: '0.375rem'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#111827'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      color: '#4b5563',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    linkHover: {
      color: '#111827'
    },
    linkIcon: {
      marginRight: '0.25rem',
      height: '1.25rem',
      width: '1.25rem'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <img
            style={styles.logo}
            width={60}
            src="/atlan-logo.png"
            alt="atlan-logo"
          />
          <h1 style={styles.title}>SQL Editor</h1>
        </div>
        <div style={styles.navLinks}>
          <a 
            href="https://github.com/vsvishalsharma/alpha-beta" 
            style={styles.link}
          >
            <Github style={styles.linkIcon} />
            GitHub
          </a>
          <a 
            href="https://github.com/vsvishalsharma/alpha-beta" 
            style={styles.link}
          >
            <BookOpen style={styles.linkIcon} />
            Documentation
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;