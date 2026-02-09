import { Heart, MapPin, Star, Eye, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../product/ProductCard';
import { ProductDetailModal } from '../product/ProductDetailModal';
import { mockProducts } from '../../../data/mockData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Product } from '../../../types';

interface HomePageProps {
  onProductClick?: (product: Product) => void;
}

export function HomePage({ onProductClick }: HomePageProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'rent' | 'buy'>('rent');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    if (viewMode === 'rent') return product.rentPrice;
    return product.buyPrice;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section with Toggle */}
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Isoko ry'u Rwanda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Kodesha cyangwa gura ibintu byiza mu Rwanda. Marketplace yizewe n'abantu benshi.
          </p>
        </div>

        {/* Rent/Buy Toggle */}
        <div className="flex items-center gap-4 p-2 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Switch
              id="view-mode"
              checked={viewMode === 'buy'}
              onCheckedChange={(checked) => setViewMode(checked ? 'buy' : 'rent')}
            />
            <Label htmlFor="view-mode" className="cursor-pointer">
              <span className={viewMode === 'rent' ? 'font-bold text-primary' : 'text-muted-foreground'}>
                {t('rent')}
              </span>
              <span className="mx-2">/</span>
              <span className={viewMode === 'buy' ? 'font-bold text-primary' : 'text-muted-foreground'}>
                {t('buy')}
              </span>
            </Label>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <TrendingUp className="h-5 w-5" />
            <span className="font-bold text-2xl">2,450+</span>
          </div>
          <p className="text-sm text-muted-foreground">Ibintu bihari</p>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Eye className="h-5 w-5" />
            <span className="font-bold text-2xl">850+</span>
          </div>
          <p className="text-sm text-muted-foreground">Abakoresha</p>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <MapPin className="h-5 w-5" />
            <span className="font-bold text-2xl">12</span>
          </div>
          <p className="text-sm text-muted-foreground">Uturere</p>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Star className="h-5 w-5" />
            <span className="font-bold text-2xl">4.8</span>
          </div>
          <p className="text-sm text-muted-foreground">Rating</p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {viewMode === 'rent' ? 'Ibikodeshwa' : 'Ibigurishwa'}
            </h2>
            <p className="text-sm text-muted-foreground">Ibintu bishya n'ibigezweho</p>
          </div>
          <Button variant="ghost">{t('viewAll')}</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              onViewDetails={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-center">Kuki watubera?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Badge className="h-8 w-8 rounded-full">✓</Badge>
            </div>
            <h4 className="font-bold">Abagurisha bemejwe</h4>
            <p className="text-sm text-muted-foreground">
              Abantu bose bemejwe bakoresha indangamuntu
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Badge className="h-8 w-8 rounded-full">🛡️</Badge>
            </div>
            <h4 className="font-bold">Escrow System</h4>
            <p className="text-sm text-muted-foreground">
              Amafaranga arakingiwe kugeza ikintu kigezeho
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Badge className="h-8 w-8 rounded-full">📱</Badge>
            </div>
            <h4 className="font-bold">Mobile Money</h4>
            <p className="text-sm text-muted-foreground">
              Ishyura ukoresheje MTN/Airtel Mobile Money
            </p>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          viewMode={viewMode}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}