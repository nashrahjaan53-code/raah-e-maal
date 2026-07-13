import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../services/auth';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await auth.verifyToken();
        setAuthenticated(isAuth.valid);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070A]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
