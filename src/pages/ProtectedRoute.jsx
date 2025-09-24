import { useNavigate } from 'react-router';
import {useAuth} from '../context/AuthContext'
import { useEffect } from 'react';

export default function ProtectedRoute({children}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}
