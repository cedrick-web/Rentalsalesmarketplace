import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus, Edit, Trash2, Eye, EyeOff, BarChart3, Heart,
  Package, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';
import type { Product } from '../../../types';
import { mockProducts } from '../../../data/mockData';

export function MyProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(mockProducts.slice(0, 5));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const stats = {
    total: products.length,
    active: products.filter(p => p.isAvailable).length,
    pending: 0,
    inactive: products.filter(p => !p.isAvailable).length,
  };

  const handleToggleAvailability = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
    ));
    toast.success(t('products.availabilityUpdated'));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.success(t('products.deleted'));
    setSelectedProduct(null);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            product.isAvailable
              ? 'bg-green-500/90'
              : 'bg-gray-500/90'
          }`}
        >
          {product.isAvailable ? t('product.active') : t('product.inactive')}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          {product.rentPrice && (
            <div>
              <p className="text-sm text-muted-foreground">{t('product.rentPrice')}</p>
              <p className="text-xl font-bold text-[#1a4d2e]">
                {product.rentPrice.toLocaleString()} RWF/day
              </p>
            </div>
          )}
          {product.buyPrice && (
            <div>
              <p className="text-sm text-muted-foreground">{t('product.buyPrice')}</p>
              <p className="text-lg font-semibold">
                {product.buyPrice.toLocaleString()} RWF
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-semibold">{product.viewCount || 0}</p>
            <p className="text-xs text-muted-foreground">{t('products.views')}</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-semibold">{product.favoriteCount || 0}</p>
            <p className="text-xs text-muted-foreground">{t('products.favorites')}</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-semibold">{product.reviewCount}</p>
            <p className="text-xs text-muted-foreground">{t('products.bookings')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          {t('common.edit')}
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <BarChart3 className="w-4 h-4 mr-2" />
          {t('products.stats')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleToggleAvailability(product.id)}
        >
          {product.isAvailable ? (
            <><EyeOff className="w-4 h-4 mr-2" /> {t('products.hide')}</>
          ) : (
            <><Eye className="w-4 h-4 mr-2" /> {t('products.show')}</>
          )}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setSelectedProduct(product)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('common.delete')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('products.deleteConfirm')}</DialogTitle>
              <DialogDescription>{t('products.deleteWarning')}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <p className="font-semibold">{product.title}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProduct(product.id)}
              >
                {t('common.delete')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('products.myProducts')}</h1>
            <p className="text-muted-foreground">{t('products.manageYourListings')}</p>
          </div>
          <Button className="bg-[#1a4d2e] hover:bg-[#153d25]">
            <Plus className="w-4 h-4 mr-2" />
            {t('products.addNew')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {t('products.total')}
            </CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('products.active')}
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.active}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t('products.pending')}
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {t('products.inactive')}
            </CardDescription>
            <CardTitle className="text-3xl text-gray-600">{stats.inactive}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Products List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t('products.all')}</TabsTrigger>
          <TabsTrigger value="active">{t('products.active')}</TabsTrigger>
          <TabsTrigger value="pending">{t('products.pending')}</TabsTrigger>
          <TabsTrigger value="inactive">{t('products.inactive')}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => p.isAvailable).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t('products.noPending')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => !p.isAvailable).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
