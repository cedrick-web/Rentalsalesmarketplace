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
import { BookingsPage } from './components/pages/BookingsPage';
import { WalletPage } from './components/pages/WalletPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ProductViewPage } from './components/pages/ProductViewPage';
import { SellerVerificationPage } from './components/pages/SellerVerificationPage';
import { SellerOrderManagementPage } from './components/pages/SellerOrderManagementPage';
import { MyProductsPage } from './components/pages/MyProductsPage';
import { mockCurrentUser, mockProducts, mockBookings } from '../data/mockData';
import type { Product } from '../types';
import '../i18n/config';

function AppContent() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Force Kinyarwanda as default
  useEffect(() => {
    i18n.changeLanguage('rw');
  }, [i18n]);

  const renderPage = () => {
    // Product View Page
    if (selectedProduct) {
      return (
        <ProductViewPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomePage onProductClick={(product) => setSelectedProduct(product)} />;
      case 'search':
        return <SearchPage filters={searchFilters} category={selectedCategory} onProductClick={(product) => setSelectedProduct(product)} />;
      case 'add':
        return <AddListingPage />;
      case 'inbox':
        return <InboxPage />;
      case 'profile':
        return <ProfilePage />;
      case 'bookings':
        return <BookingsPage />;
      case 'wallet':
        return <WalletPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'seller-verify':
        return <SellerVerificationPage />;
      case 'seller-orders':
        return <SellerOrderManagementPage />;
      case 'my-products':
        return <MyProductsPage />;
      default:
        return <HomePage onProductClick={(product) => setSelectedProduct(product)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!selectedProduct && (
        <Navbar
          user={mockCurrentUser}
          notificationCount={3}
          onSearch={(query) => {
            setSearchFilters({ ...searchFilters, query });
            setActiveTab('search');
          }}
          onNavigate={(tab) => setActiveTab(tab)}
        />
      )}
      {!selectedProduct && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      {activeTab === 'search' && !selectedProduct && (
        <AdvancedSearch onSearch={(filters) => setSearchFilters(filters)} />
      )}
      
      <main className="pb-20 md:pb-0">
        {renderPage()}
      </main>

      {!selectedProduct && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          messageCount={5}
        />
      )}
      
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