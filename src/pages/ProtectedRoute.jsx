import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    // Redirect to authentication page if no token or user data exists
    if (!token || !userString) {
        return <Navigate to="/auth" replace />; 
    }

    try {
        const user = JSON.parse(userString);

        // Redirect to home page if the user lacks the strictly required role
        if (requiredRole && user.role !== requiredRole) {
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        // Handle cases where localStorage user data is corrupted
        localStorage.clear();
        return <Navigate to="/auth" replace />;
    }

    return children;
}