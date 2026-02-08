import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, Booking, Message, Notification } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  viewMode: 'rent' | 'buy';
  setViewMode: (mode: 'rent' | 'buy') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'rent' | 'buy'>('rent');

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const value = {
    user,
    setUser,
    products,
    setProducts,
    bookings,
    setBookings,
    messages,
    setMessages,
    notifications,
    setNotifications,
    wishlist,
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
