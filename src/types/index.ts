export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'vehicles' | 'electronics' | 'clothing' | 'houses' | 'furniture' | 'tools' | 'others';
  images: string[];
  rentPrice?: number;
  buyPrice?: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  owner: User;
  rating: number;
  reviewCount: number;
  availability: Date[];
  isAvailable: boolean;
  deposit?: number;
  features?: string[];
  condition?: 'new' | 'like-new' | 'good' | 'fair';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  joinedDate: Date;
  location?: string;
}

export interface Booking {
  id: string;
  product: Product;
  renter: User;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  escrowStatus: 'locked' | 'released' | 'refunded';
  deliveryAddress?: string;
  notes?: string;
  handoverPhotos?: string[];
  returnPhotos?: string[];
  damageReport?: string;
  lateFee?: number;
}

export interface Review {
  id: string;
  user: User;
  product: Product;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
}

export interface Transaction {
  id: string;
  type: 'rental' | 'purchase' | 'deposit' | 'refund' | 'withdrawal';
  amount: number;
  currency: 'RWF' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  date: Date;
  from?: User;
  to?: User;
  booking?: Booking;
  paymentMethod: 'momo' | 'airtel' | 'bank' | 'card';
}

export interface Message {
  id: string;
  from: User;
  to: User;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
  productContext?: Product;
}

export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'message' | 'review' | 'reminder' | 'dispute';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface EscrowStatus {
  bookingId: string;
  amount: number;
  status: 'pending' | 'locked' | 'released' | 'disputed' | 'refunded';
  stages: {
    moneySent: boolean;
    moneyHeld: boolean;
    itemVerified: boolean;
    moneyReleased: boolean;
  };
}

export interface HandoverChecklist {
  bookingId: string;
  items: {
    label: string;
    checked: boolean;
    notes?: string;
  }[];
  photos: string[];
  signedBy?: {
    owner: boolean;
    renter: boolean;
  };
  timestamp?: Date;
}
