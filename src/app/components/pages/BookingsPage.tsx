import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, User, DollarSign, Clock, Package, AlertCircle, CheckCircle, XCircle, MessageCircle, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { mockBookings } from '../../../data/mockData';
import type { Booking } from '../../../types';

export function BookingsPage() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  const filterBookings = (status: string) => {
    if (status === 'all') return bookings;
    return bookings.filter(b => b.status === status);
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

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled', paymentStatus: 'refunded' } : b
    ));
    toast.success(t('bookings.cancelled'));
    setSelectedBooking(null);
    setCancelReason('');
  };

  const handleCompleteBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'completed', escrowStatus: 'released' } : b
    ));
    toast.success(t('bookings.completed'));
    setSelectedBooking(null);
  };

  const handleSubmitReview = (bookingId: string) => {
    toast.success(t('review.submitted'));
    setSelectedBooking(null);
    setReviewRating(5);
    setReviewComment('');
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    active: bookings.filter(b => b.status === 'active').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <img
              src={booking.product.images[0]}
              alt={booking.product.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <CardTitle className="text-lg">{booking.product.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {booking.product.location.address}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(booking.status)}>
                  {t(`status.${booking.status}`)}
                </Badge>
                <Badge variant="outline">
                  {booking.paymentStatus === 'paid' ? t('payment.paid') : t('payment.pending')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(booking.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{booking.product.owner.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">{booking.totalPrice.toLocaleString()} RWF</span>
          </div>
        </div>
        {booking.deliveryAddress && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{t('delivery.address')}</p>
                <p className="text-muted-foreground">{booking.deliveryAddress}</p>
              </div>
            </div>
          </div>
        )}
        {booking.notes && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
            <p className="text-muted-foreground">{booking.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
              <AlertCircle className="w-4 h-4 mr-2" />
              {t('bookings.details')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('bookings.details')}</DialogTitle>
              <DialogDescription>Booking ID: #{booking.id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={booking.product.images[0]}
                alt={booking.product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('product.title')}</p>
                  <p className="font-medium">{booking.product.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status.label')}</p>
                  <Badge className={getStatusColor(booking.status)}>
                    {t(`status.${booking.status}`)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('booking.startDate')}</p>
                  <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('booking.endDate')}</p>
                  <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('payment.total')}</p>
                  <p className="font-semibold text-lg">{booking.totalPrice.toLocaleString()} RWF</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('payment.deposit')}</p>
                  <p className="font-medium">{booking.deposit.toLocaleString()} RWF</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('payment.status')}</p>
                  <Badge variant="outline">
                    {t(`payment.${booking.paymentStatus}`)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('escrow.status')}</p>
                  <Badge variant="outline">
                    {t(`escrow.${booking.escrowStatus}`)}
                  </Badge>
                </div>
              </div>
              {booking.deliveryAddress && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{t('delivery.address')}</p>
                  <p className="font-medium">{booking.deliveryAddress}</p>
                </div>
              )}
            </div>
            <DialogFooter className="gap-2">
              {booking.status === 'pending' || booking.status === 'confirmed' ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <XCircle className="w-4 h-4 mr-2" />
                      {t('bookings.cancel')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('bookings.cancelConfirm')}</DialogTitle>
                      <DialogDescription>
                        {t('bookings.cancelWarning')}
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder={t('bookings.cancelReason')}
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCancelReason('')}>
                        {t('common.no')}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={!cancelReason.trim()}
                      >
                        {t('bookings.cancel')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
              {booking.status === 'active' ? (
                <Button variant="default" size="sm" onClick={() => handleCompleteBooking(booking.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('bookings.complete')}
                </Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {booking.status === 'completed' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <Star className="w-4 h-4 mr-2" />
                {t('review.leave')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('review.leave')}</DialogTitle>
                <DialogDescription>{booking.product.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('review.rating')}</label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= reviewRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('review.comment')}</label>
                  <Textarea
                    placeholder={t('review.placeholder')}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={() => handleSubmitReview(booking.id)}>
                  {t('review.submit')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {t('chat.message')}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('bookings.title')}</h1>
        <p className="text-muted-foreground">{t('bookings.description')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('bookings.total')}</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('status.pending')}</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('status.active')}</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.active}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('status.completed')}</CardDescription>
            <CardTitle className="text-3xl text-gray-600">{stats.completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Bookings List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">{t('bookings.all')}</TabsTrigger>
          <TabsTrigger value="pending">{t('status.pending')}</TabsTrigger>
          <TabsTrigger value="confirmed">{t('status.confirmed')}</TabsTrigger>
          <TabsTrigger value="active">{t('status.active')}</TabsTrigger>
          <TabsTrigger value="completed">{t('status.completed')}</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'confirmed', 'active', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filterBookings(status).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('bookings.empty')}</p>
                </CardContent>
              </Card>
            ) : (
              filterBookings(status).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
