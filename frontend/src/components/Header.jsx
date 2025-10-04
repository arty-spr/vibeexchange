import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTutorial } from '../context/TutorialContext';
import { LogOut, User, TrendingUp, Moon, Sun, HelpCircle, Settings as SettingsIcon, BookOpen } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isTutorialMode, toggleTutorialMode } = useTutorial();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">CryptoExchange</span>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">DEMO</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>

            {isAuthenticated && (
              <>
                <button
                  onClick={toggleTutorialMode}
                  className={`p-2 rounded-lg transition-colors ${
                    isTutorialMode ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                </button>

                <nav className="flex items-center space-x-6">
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Dashboard</Link>
                  <Link to="/trading" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Trading</Link>
                  <Link to="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Portfolio</Link>
                  <Link to="/transactions" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Transactions</Link>
                  <Link to="/learn" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                    <BookOpen className="h-4 w-4" />Learn
                  </Link>
                  
                  <div className="flex items-center space-x-4 border-l border-gray-300 dark:border-gray-600 pl-6">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Balance: ${user?.balance?.toFixed(2)}</div>
                    </div>

                    <Link to="/settings" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400">
                      <SettingsIcon className="h-5 w-5" />
                    </Link>
                    
                    <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;