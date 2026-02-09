import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bell, Wallet, Heart, HelpCircle, BarChart3, Star, AlertTriangle,
  Gift, Tag, Search, Activity, DollarSign, TrendingUp, Users, Package
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { WalletPage } from './WalletPage';

export function DashboardPage() {
  const { t } = useTranslation();
  const [notifications] = useState([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for Toyota RAV4 has been confirmed',
      timestamp: new Date(2024, 1, 9, 10, 30),
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of 250,000 RWF received successfully',
      timestamp: new Date(2024, 1, 9, 9, 15),
      read: false,
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'John Doe sent you a message',
      timestamp: new Date(2024, 1, 8, 16, 45),
      read: true,
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star review',
      timestamp: new Date(2024, 1, 8, 14, 20),
      read: true,
    },
  ]);

  const [wishlist] = useState([
    {
      id: '1',
      title: 'Toyota RAV4 2020',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
      available: true,
    },
    {
      id: '2',
      title: 'MacBook Pro 16"',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      available: true,
    },
    {
      id: '3',
      title: '3-Bedroom Apartment',
      price: 80000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      available: false,
    },
  ]);

  const [savedSearches] = useState([
    { id: '1', name: 'Cars in Kigali', filters: 'category:vehicles,location:kigali', count: 45 },
    { id: '2', name: 'Electronics under 50k', filters: 'category:electronics,maxPrice:50000', count: 120 },
    { id: '3', name: 'Houses in Gasabo', filters: 'category:houses,location:gasabo', count: 28 },
  ]);

  const [promoCodes] = useState([
    { code: 'WELCOME10', discount: '10%', expires: new Date(2024, 2, 31), active: true },
    { code: 'FIRST50', discount: '50,000 RWF', expires: new Date(2024, 1, 28), active: true },
    { code: 'SUMMER20', discount: '20%', expires: new Date(2024, 1, 15), active: false },
  ]);

  const [referrals] = useState({
    code: 'JOHN2024',
    referredUsers: 12,
    earnings: 120000,
    pendingRewards: 30000,
  });

  const [analytics] = useState({
    totalViewed: 45,
    totalBookings: 8,
    totalSpent: 850000,
    avgRating: 4.8,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Package className="w-5 h-5 text-blue-500" />;
      case 'payment': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'message': return <Bell className="w-5 h-5 text-purple-500" />;
      case 'review': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.description')}</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-10">
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.notifications')}</span>
          </TabsTrigger>
          <TabsTrigger value="wallet">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.wallet')}</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.wishlist')}</span>
          </TabsTrigger>
          <TabsTrigger value="support">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.support')}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.analytics')}</span>
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.reviews')}</span>
          </TabsTrigger>
          <TabsTrigger value="disputes">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.disputes')}</span>
          </TabsTrigger>
          <TabsTrigger value="referrals">
            <Gift className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.referrals')}</span>
          </TabsTrigger>
          <TabsTrigger value="promo">
            <Tag className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.promo')}</span>
          </TabsTrigger>
          <TabsTrigger value="searches">
            <Search className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.searches')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.notifications')}</CardTitle>
              <CardDescription>{t('dashboard.notificationsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex gap-4 p-4 rounded-lg border ${
                        !notif.read ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200' : ''
                      }`}
                    >
                      <div className="p-2 bg-muted rounded-full h-fit">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold">{notif.title}</h4>
                          {!notif.read && <Badge className="bg-blue-500">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notif.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet">
          <WalletPage />
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.wishlist')}</CardTitle>
              <CardDescription>{t('dashboard.wishlistDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-lg font-bold text-[#1a4d2e] mb-3">
                        {item.price.toLocaleString()} RWF/day
                      </p>
                      <Badge variant={item.available ? 'default' : 'secondary'} className="mb-3">
                        {item.available ? t('product.available') : t('product.unavailable')}
                      </Badge>
                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={!item.available}>
                          {t('common.bookNow')}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.support')}</CardTitle>
              <CardDescription>{t('dashboard.supportDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  {t('support.createTicket')}
                </Button>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold">{t('support.myTickets')}</h4>
                  <p className="text-muted-foreground text-sm">{t('support.noTickets')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('analytics.viewed')}</CardDescription>
                <CardTitle className="text-3xl">{analytics.totalViewed}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('analytics.viewedDesc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('analytics.bookings')}</CardDescription>
                <CardTitle className="text-3xl">{analytics.totalBookings}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('analytics.bookingsDesc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('analytics.spent')}</CardDescription>
                <CardTitle className="text-2xl">{analytics.totalSpent.toLocaleString()} RWF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('analytics.spentDesc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('analytics.rating')}</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {analytics.avgRating}
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('analytics.ratingDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.reviews')}</CardTitle>
              <CardDescription>{t('dashboard.reviewsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">{t('reviews.noReviews')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.disputes')}</CardTitle>
              <CardDescription>{t('dashboard.disputesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('disputes.noDisputes')}</p>
                <Button className="mt-4" variant="outline">
                  {t('disputes.fileDispute')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.referrals')}</CardTitle>
              <CardDescription>{t('dashboard.referralsDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-[#1a4d2e] to-[#2d5a3d] text-white rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{t('referrals.yourCode')}</h3>
                <p className="text-3xl font-bold mb-4">{referrals.code}</p>
                <Button className="bg-white text-[#1a4d2e] hover:bg-gray-100">
                  {t('referrals.share')}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>{t('referrals.referred')}</CardDescription>
                    <CardTitle className="text-3xl">{referrals.referredUsers}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>{t('referrals.earned')}</CardDescription>
                    <CardTitle className="text-2xl">{referrals.earnings.toLocaleString()} RWF</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>{t('referrals.pending')}</CardDescription>
                    <CardTitle className="text-2xl">{referrals.pendingRewards.toLocaleString()} RWF</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promo Codes Tab */}
        <TabsContent value="promo">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.promo')}</CardTitle>
              <CardDescription>{t('dashboard.promoDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promoCodes.map((promo) => (
                  <div
                    key={promo.code}
                    className={`p-4 border rounded-lg ${
                      !promo.active ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{promo.code}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t('promo.discount')}: {promo.discount}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('promo.expires')}: {promo.expires.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={promo.active ? 'default' : 'secondary'}>
                        {promo.active ? t('promo.active') : t('promo.expired')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Searches Tab */}
        <TabsContent value="searches">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.searches')}</CardTitle>
              <CardDescription>{t('dashboard.searchesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedSearches.map((search) => (
                  <div key={search.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{search.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{search.filters}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>{search.count} {t('search.results')}</Badge>
                        <Button size="sm">{t('search.view')}</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
