import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin, Star, Heart, Share2, Shield, Calendar, DollarSign,
  Package, User, Phone, Mail, MessageCircle, CheckCircle, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { BookingModal } from '../booking/BookingModal';
import type { Product } from '../../../types';

interface ProductViewPageProps {
  product: Product;
  onBack?: () => void;
}

export function ProductViewPage({ product, onBack }: ProductViewPageProps) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingMode, setBookingMode] = useState<'rent' | 'buy'>('rent');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  const reviews = [
    {
      id: '1',
      user: { name: 'Alice Mugisha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
      rating: 5,
      comment: 'Excellent service! The car was in perfect condition.',
      date: new Date(2024, 1, 5),
      images: [],
    },
    {
      id: '2',
      user: { name: 'Patrick Nkunda', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick' },
      rating: 4,
      comment: 'Very good experience. Highly recommended!',
      date: new Date(2024, 1, 3),
      images: [],
    },
    {
      id: '3',
      user: { name: 'Marie Uwase', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie' },
      rating: 5,
      comment: 'Amazing product and great owner!',
      date: new Date(2024, 0, 28),
      images: [],
    },
  ];

  const relatedProducts = [
    {
      id: '1',
      title: 'Toyota Corolla 2021',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      rating: 4.7,
    },
    {
      id: '2',
      title: 'Honda CR-V 2020',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Nissan X-Trail 2019',
      price: 48000,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      rating: 4.6,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[400px] bg-black">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full h-full object-contain"
        />
        {product.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {product.images.length > 1 && (
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-[#1a4d2e]' : 'border-transparent'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span>({product.reviewCount} {t('product.reviews')})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location.address}</span>
                </div>
              </div>
            </div>
            {product.condition && (
              <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">
                {t(`condition.${product.condition}`)}
              </Badge>
            )}
          </div>

          {/* Pricing Card */}
          <Card className="bg-gradient-to-br from-[#1a4d2e] to-[#2d5a3d] text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                {product.rentPrice && (
                  <div>
                    <p className="text-sm opacity-90">{t('product.rentPrice')}</p>
                    <p className="text-4xl font-bold">{product.rentPrice.toLocaleString()} RWF</p>
                    <p className="text-sm opacity-75">{t('product.perDay')}</p>
                  </div>
                )}
                {product.buyPrice && (
                  <div>
                    <p className="text-sm opacity-90">{t('product.buyPrice')}</p>
                    <p className="text-3xl font-bold">{product.buyPrice.toLocaleString()} RWF</p>
                  </div>
                )}
                {product.deposit && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>{t('product.deposit')}: {product.deposit.toLocaleString()} RWF</span>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  {product.rentPrice && (
                    <Button
                      className="flex-1 bg-white text-[#1a4d2e] hover:bg-gray-100"
                      onClick={() => {
                        setBookingMode('rent');
                        setShowBookingModal(true);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('product.rentNow')}
                    </Button>
                  )}
                  {product.buyPrice && (
                    <Button
                      className="flex-1 bg-white text-[#1a4d2e] hover:bg-gray-100"
                      onClick={() => {
                        setBookingMode('buy');
                        setShowBookingModal(true);
                      }}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      {t('product.buyNow')}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seller Info */}
        <Card>
          <CardHeader>
            <CardTitle>{t('product.seller')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={product.owner.avatar} />
                  <AvatarFallback>{product.owner.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{product.owner.name}</h3>
                    {product.owner.isVerified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.owner.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.owner.reviewCount} {t('product.reviews')})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('seller.memberSince')} {new Date(product.owner.joinedDate).getFullYear()}
                  </p>
                </div>
              </div>
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('seller.message')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
            <TabsTrigger value="features">{t('product.features')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('product.reviews')}</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardContent className="p-6">
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{t('product.noFeatures')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {/* Rating Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-5xl font-bold">{product.rating}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.reviewCount} {t('product.reviews')}
                      </p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${(stars / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {Math.floor((stars / 5) * product.reviewCount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.date.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('product.related')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-[#1a4d2e]">
                    {item.price.toLocaleString()} RWF/day
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          product={product}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          mode={bookingMode}
        />
      )}
    </div>
  );
}
