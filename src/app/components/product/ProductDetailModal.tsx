import { X, MapPin, Star, Share2, Flag, Calendar, Shield, BadgeCheck, MessageSquare, Heart } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Product } from '../../../types';
import { BookingModal } from '../booking/BookingModal';

interface ProductDetailModalProps {
  product: Product;
  viewMode: 'rent' | 'buy';
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, viewMode, isOpen, onClose }: ProductDetailModalProps) {
  const { t } = useTranslation();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const price = viewMode === 'rent' ? product.rentPrice : product.buyPrice;
  
  if (!price) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <ScrollArea className="h-full">
            <div className="relative">
              {/* Image Gallery */}
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative">
                        <img
                          src={image}
                          alt={`${product.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{product.location.address}</span>
                    </div>
                  </div>
                  {product.condition && (
                    <Badge>
                      {product.condition === 'new' && 'Gishya'}
                      {product.condition === 'like-new' && 'Nk\'igishya'}
                      {product.condition === 'good' && 'Nziza'}
                      {product.condition === 'fair' && 'Isanzwe'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount} {t('reviews')})
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Price */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-primary">
                  {price.toLocaleString()} RWF
                </div>
                <div className="text-sm text-muted-foreground">
                  {viewMode === 'rent' ? t('rentPerDay') : t('buyPrice')}
                </div>
                {product.deposit && viewMode === 'rent' && (
                  <div className="mt-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Ingwate: {product.deposit.toLocaleString()} RWF
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold mb-2">Ibisobanuro</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-bold mb-2">Ibimenyetso</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Owner Info */}
              <div>
                <h3 className="font-bold mb-3">Umugurisha / Umukodesha</h3>
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={product.owner.avatar} />
                      <AvatarFallback>{product.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{product.owner.name}</span>
                        {product.owner.isVerified && (
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.owner.rating.toFixed(1)}</span>
                        <span>•</span>
                        <span>{product.owner.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t('sendMessage')}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={() => setShowBookingModal(true)}>
                  <Calendar className="h-5 w-5 mr-2" />
                  {viewMode === 'rent' ? t('bookNow') : t('buy')}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          product={product}
          viewMode={viewMode}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}
