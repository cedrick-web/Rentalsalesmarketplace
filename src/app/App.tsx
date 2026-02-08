import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { AppProvider } from '../context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { CategoryFilter } from './components/navigation/CategoryFilter';
import { AdvancedSearch } from './components/navigation/AdvancedSearch';
import { BottomNav } from './components/navigation/BottomNav';
import { HomePage } from './components/pages/HomePage';
import { SearchPage } from './components/pages/SearchPage';
import { AddListingPage } from './components/pages/AddListingPage';
import { InboxPage } from './components/pages/InboxPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { mockCurrentUser, mockProducts, mockBookings } from '../data/mockData';
import '../i18n/config';

function AppContent() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState({});

  // Force Kinyarwanda as default
  useEffect(() => {
    i18n.changeLanguage('rw');
  }, [i18n]);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage filters={searchFilters} category={selectedCategory} />;
      case 'add':
        return <AddListingPage />;
      case 'inbox':
        return <InboxPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        user={mockCurrentUser}
        notificationCount={3}
        onSearch={(query) => {
          setSearchFilters({ ...searchFilters, query });
          setActiveTab('search');
        }}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {activeTab === 'search' && (
        <AdvancedSearch onSearch={(filters) => setSearchFilters(filters)} />
      )}
      
      <main className="pb-20 md:pb-0">
        {renderPage()}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        messageCount={5}
      />
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
