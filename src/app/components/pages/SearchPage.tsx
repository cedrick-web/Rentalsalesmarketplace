import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../product/ProductCard';
import { ProductDetailModal } from '../product/ProductDetailModal';
import { mockProducts } from '../../../data/mockData';
import { Product } from '../../../types';
import { Button } from '../ui/button';

interface SearchPageProps {
  filters?: any;
  category?: string | null;
}

export function SearchPage({ filters, category }: SearchPageProps) {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'rent' | 'buy'>('rent');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    if (category && product.category !== category) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {category ? t(category) : 'Ibisubizo by\'ishakiro'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} ibintu byabonetse
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => {
                setWishlist(prev =>
                  prev.includes(product.id)
                    ? prev.filter(id => id !== product.id)
                    : [...prev, product.id]
                );
              }}
              onViewDetails={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">{t('noResults')}</h3>
            <p className="text-muted-foreground">
              Gerageza gushakisha ikindi kintu cyangwa hindura filters
            </p>
          </div>
        )}
      </div>

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
