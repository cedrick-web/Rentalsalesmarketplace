import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package, Clock, CheckCircle, XCircle, DollarSign, TrendingUp,
  User, Calendar, MapPin, Phone, MessageCircle, RefreshCw, Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import type { Booking } from '../../../types';

export function SellerOrderManagementPage() {
  const { t } = useTranslation();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  // Mock orders data
  const [orders, setOrders] = useState<Booking[]>([
    {
      id: 'ORD001',
      product: {
        id: '1',
        title: 'Toyota RAV4 2020',
        images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'],
        category: 'vehicles',
        description: '',
        location: { address: 'Kigali, Gasabo', lat: 0, lng: 0 },
        owner: {
          id: '1',
          name: 'Current User',
          email: '',
          phone: '',
          isVerified: true,
          rating: 4.8,
          reviewCount: 45,
          joinedDate: new Date()
        },
        rating: 4.8,
        reviewCount: 45,
        availability: [],
        isAvailable: true,
        rentPrice: 50000,
      },
      renter: {
        id: '2',
        name: 'Jane Uwase',
        email: 'jane@example.com',
        phone: '0788123456',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        isVerified: true,
        rating: 4.9,
        reviewCount: 12,
        joinedDate: new Date(),
      },
      startDate: new Date(2024, 1, 15),
      endDate: new Date(2024, 1, 20),
      totalPrice: 250000,
      deposit: 50000,
      status: 'pending',
      paymentStatus: 'paid',
      escrowStatus: 'locked',
      deliveryAddress: 'KN 5 Ave, Kigali',
      notes: 'Please deliver before 10 AM'
    },
    {
      id: 'ORD002',
      product: {
        id: '2',
        title: 'MacBook Pro 16"',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
        category: 'electronics',
        description: '',
        location: { address: 'Kigali, Kicukiro', lat: 0, lng: 0 },
        owner: {
          id: '1',
          name: 'Current User',
          email: '',
          phone: '',
          isVerified: true,
          rating: 4.8,
          reviewCount: 45,
          joinedDate: new Date()
        },
        rating: 4.9,
        reviewCount: 28,
        availability: [],
        isAvailable: true,
        rentPrice: 35000,
      },
      renter: {
        id: '3',
        name: 'Patrick Mugabo',
        email: 'patrick@example.com',
        phone: '0782345678',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick',
        isVerified: true,
        rating: 4.7,
        reviewCount: 8,
        joinedDate: new Date(),
      },
      startDate: new Date(2024, 1, 12),
      endDate: new Date(2024, 1, 19),
      totalPrice: 245000,
      deposit: 100000,
      status: 'active',
      paymentStatus: 'paid',
      escrowStatus: 'locked',
    },
  ]);

  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    active: orders.filter(o => o.status === 'active').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + (o.totalPrice * 0.9), 0), // After 10% commission
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // In real app, this would fetch new orders
      toast.info(t('orders.refreshed'));
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, t]);

  const handleApproveOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'confirmed' as const } : o
    ));
    toast.success(t('orders.approved'));
    setSelectedOrder(null);
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'cancelled' as const, paymentStatus: 'refunded' as const } : o
    ));
    toast.success(t('orders.rejected'));
    setSelectedOrder(null);
    setRejectionReason('');
  };

  const handleConfirmDelivery = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'completed' as const, escrowStatus: 'released' as const } : o
    ));
    toast.success(t('orders.deliveryConfirmed'));
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
      confirmed: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
      active: 'bg-green-500/20 text-green-700 dark:text-green-400',
      completed: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
      cancelled: 'bg-red-500/20 text-red-700 dark:text-red-400',
    };
    return colors[status as keyof typeof colors] || '';
  };

  const OrderCard = ({ order }: { order: Booking }) => {
    const commission = order.totalPrice * 0.1;
    const payout = order.totalPrice - commission;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-4">
            <img
              src={order.product.images[0]}
              alt={order.product.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{order.product.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('orders.orderId')}: #{order.id}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {t(`status.${order.status}`)}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage src={order.renter.avatar} />
              <AvatarFallback>{order.renter.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{order.renter.name}</p>
                {order.renter.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{order.renter.phone}</p>
            </div>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t('orders.startDate')}</p>
                <p className="font-medium">{new Date(order.startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t('orders.endDate')}</p>
                <p className="font-medium">{new Date(order.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {order.deliveryAddress && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  {t('orders.deliveryAddress')}
                </p>
                <p className="text-blue-700 dark:text-blue-300">{order.deliveryAddress}</p>
              </div>
            </div>
          )}

          {order.notes && (
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">{t('orders.customerNotes')}</p>
              <p className="text-muted-foreground">{order.notes}</p>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('orders.totalAmount')}</span>
              <span className="font-semibold">{order.totalPrice.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between text-sm text-red-600">
              <span>{t('orders.commission')} (10%)</span>
              <span>-{commission.toLocaleString()} RWF</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-[#1a4d2e]">
              <span>{t('orders.yourPayout')}</span>
              <span>{payout.toLocaleString()} RWF</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {t(`escrow.${order.escrowStatus}`)}
              </Badge>
              {order.escrowStatus === 'locked' && (
                <span>{t('orders.escrowNote')}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1" onClick={() => setSelectedOrder(order)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('orders.approve')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('orders.approveOrder')}</DialogTitle>
                      <DialogDescription>
                        {t('orders.approveConfirm')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <p className="text-sm">
                        <strong>{t('orders.customer')}:</strong> {order.renter.name}
                      </p>
                      <p className="text-sm">
                        <strong>{t('orders.product')}:</strong> {order.product.title}
                      </p>
                      <p className="text-sm">
                        <strong>{t('orders.period')}:</strong>{' '}
                        {new Date(order.startDate).toLocaleDateString()} -{' '}
                        {new Date(order.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                        {t('common.cancel')}
                      </Button>
                      <Button onClick={() => handleApproveOrder(order.id)}>
                        {t('orders.approve')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex-1" onClick={() => setSelectedOrder(order)}>
                      <XCircle className="w-4 h-4 mr-2" />
                      {t('orders.reject')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('orders.rejectOrder')}</DialogTitle>
                      <DialogDescription>
                        {t('orders.rejectWarning')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">{t('orders.rejectionReason')}</label>
                        <Textarea
                          placeholder={t('orders.reasonPlaceholder')}
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setSelectedOrder(null);
                        setRejectionReason('');
                      }}>
                        {t('common.cancel')}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleRejectOrder(order.id)}
                        disabled={!rejectionReason.trim()}
                      >
                        {t('orders.reject')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}

            {order.status === 'active' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1" onClick={() => setSelectedOrder(order)}>
                    <Package className="w-4 h-4 mr-2" />
                    {t('orders.confirmDelivery')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('orders.confirmDelivery')}</DialogTitle>
                    <DialogDescription>
                      {t('orders.deliveryWarning')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      {t('orders.payoutNote')}
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {(order.totalPrice * 0.9).toLocaleString()} RWF
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                      {t('common.cancel')}
                    </Button>
                    <Button onClick={() => handleConfirmDelivery(order.id)}>
                      {t('orders.confirm')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('orders.management')}</h1>
            <p className="text-muted-foreground">{t('orders.description')}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 dark:bg-green-950/20' : ''}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {t('orders.autoRefresh')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t('orders.pending')}
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {t('orders.active')}
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.active}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('orders.completed')}
            </CardDescription>
            <CardTitle className="text-3xl text-gray-600">{stats.completed}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a4d2e] to-[#2d5a3d] text-white">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-white/80">
              <DollarSign className="w-4 h-4" />
              {t('orders.totalRevenue')}
            </CardDescription>
            <CardTitle className="text-2xl">{stats.totalRevenue.toLocaleString()} RWF</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Orders List */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            {t('status.pending')} ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="active">
            {t('status.active')} ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('status.completed')} ({stats.completed})
          </TabsTrigger>
          <TabsTrigger value="all">
            {t('orders.all')} ({orders.length})
          </TabsTrigger>
        </TabsList>

        {['pending', 'active', 'completed', 'all'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {(status === 'all' 
              ? orders 
              : orders.filter(o => o.status === status)
            ).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('orders.empty')}</p>
                </CardContent>
              </Card>
            ) : (
              (status === 'all' 
                ? orders 
                : orders.filter(o => o.status === status)
              ).map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
