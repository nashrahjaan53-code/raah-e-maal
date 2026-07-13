import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, getToken, clearToken } from '../services/api';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = getToken();
        
        if (!token) {
          // No token, redirect to auth
          navigate('/auth');
          return;
        }

        // Verify token and check role
        const data = await apiRequest('/api/users/verify-token', {
          method: 'GET',
        });

        if (!data) {
          // Token invalid, redirect to auth
          clearToken();
          navigate('/auth');
          return;
        }
        
        if (data.role === 'admin') {
          setIsAdmin(true);
          setLoading(false);
        } else {
          // Not an admin, redirect to home
          alert('Admin access required');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/auth');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#020203]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return children;
};

export default AdminGuard;
