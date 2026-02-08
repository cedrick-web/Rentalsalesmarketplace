import { User, Settings, Wallet, Package, Calendar, Star, BadgeCheck, MapPin, Phone, Mail, Edit } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockCurrentUser, mockBookings, mockProducts } from '../../../data/mockData';
import { Separator } from '../ui/separator';

export function ProfilePage() {
  const { t } = useTranslation();
  const user = mockCurrentUser;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.isVerified && (
                  <Badge variant="secondary" className="gap-1">
                    <BadgeCheck className="h-3 w-3" />
                    {t('verified')}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Yinjiye: {user.joinedDate.toLocaleDateString('rw-RW')}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{user.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  {t('edit')} Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('settings')}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">{t('myListings')}</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground">{t('myRentals')}</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">450K</div>
                <div className="text-xs text-muted-foreground">{t('earnings')}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="rentals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rentals">
            <Calendar className="h-4 w-4 mr-2" />
            {t('myRentals')}
          </TabsTrigger>
          <TabsTrigger value="listings">
            <Package className="h-4 w-4 mr-2" />
            {t('myListings')}
          </TabsTrigger>
          <TabsTrigger value="wallet">
            <Wallet className="h-4 w-4 mr-2" />
            {t('wallet')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rentals" className="space-y-4 mt-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={booking.product.images[0]}
                    alt={booking.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{booking.product.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {booking.startDate.toLocaleDateString('rw-RW')} - {booking.endDate.toLocaleDateString('rw-RW')}
                        </span>
                      </div>
                      <div>
                        Igiciro: {booking.totalPrice.toLocaleString()} RWF
                      </div>
                    </div>
                    <Badge className="mt-2" variant={booking.status === 'active' ? 'default' : 'secondary'}>
                      {booking.status === 'active' && 'Birakora'}
                      {booking.status === 'completed' && 'Byarangiye'}
                      {booking.status === 'pending' && 'Bitegereje'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="listings" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockProducts.slice(0, 4).map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold line-clamp-1">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.rentPrice?.toLocaleString()} RWF/munsi
                      </p>
                      <Badge variant={product.isAvailable ? 'default' : 'secondary'} className="mt-1">
                        {product.isAvailable ? 'Kirahari' : 'Ntikiri kihari'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('wallet')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-xl p-6">
                <div className="text-sm opacity-90 mb-2">Amafaranga yawe</div>
                <div className="text-4xl font-bold mb-4">450,000 RWF</div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    {t('withdraw')}
                  </Button>
                  <Button variant="secondary" size="sm">
                    Ongera amafaranga
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-bold">Amateka y'amafaranga</h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <div className="font-bold">Igiciro cya booking #{i}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString('rw-RW')}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      +{(50000 * i).toLocaleString()} RWF
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
