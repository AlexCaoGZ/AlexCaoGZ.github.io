import { Link } from 'react-router-dom';
import { useState } from 'react';

interface User {
    name: string;
  }

export default function Topbar() {
    const [user, setUser] = useState<User | null>(null);
    const handleLogin = () => {
        setUser({
          name: 'zcao'
        });
      };
    const handleLogout = () => {
        setUser(null); // remove user info
    };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      backgroundColor: '#282c34', 
      color: 'white' 
    }}>
      {/* lift side */}
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white', textDecoration: 'none' }}>
        zcao3138
      </Link>
      
      {/* right side */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          // UI for Login-ed
          <>
            <span>Good Day, {user.name}</span>
            <Link to="/profile" style={{ color: '#61dafb', textDecoration: 'none' }}>Profile</Link>
            <button 
              onClick={handleLogout}
              style={{ padding: '6px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}
            >
              Logout
            </button>
          </>
        ) : (
          // UI for not Login-ed
          <button 
            onClick={handleLogin}
            style={{ padding: '6px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#61dafb', fontWeight: 'bold' }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}