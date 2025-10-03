import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, TrendingUp } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">CryptoExchange</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">DEMO</span>
          </Link>

          {isAuthenticated && (
            <nav className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/trading" 
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Trading
              </Link>
              <Link 
                to="/portfolio" 
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Portfolio
              </Link>
              <Link 
                to="/transactions" 
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Transactions
              </Link>
              
              <div className="flex items-center space-x-4 border-l pl-6">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Balance: ${user?.balance?.toFixed(2)}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;