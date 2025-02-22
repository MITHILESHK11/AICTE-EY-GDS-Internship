import React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Demo login - in real app this would validate against a backend
    if (email === 'demo@example.com' && password === 'demo123') {
      setUser({
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User'
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App