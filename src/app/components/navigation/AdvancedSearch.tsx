import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  condition?: string;
  verified?: boolean;
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onSearch({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({ query: '', minPrice: 0, maxPrice: 1000000 });
    setPriceRange([0, 1000000]);
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <div className="w-full bg-secondary/30 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`${t('search')} ${t('or')} ${t('location')}...`}
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              className="pl-10 bg-background"
            />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 relative">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">{t('filter')}</span>
                {activeFilterCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('filter')} & {t('search')}</SheetTitle>
                <SheetDescription>
                  Hitamo ibyo ushaka kugira ngo ubone ibisubizo byiza
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Location Filter */}
                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {t('location')}
                  </Label>
                  <Input
                    id="location"
                    placeholder="Kigali, Gasabo..."
                    value={filters.location || ''}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>{t('price')} (RWF)</Label>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()} RWF</span>
                    <span>{priceRange[1].toLocaleString()} RWF</span>
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="space-y-2">
                  <Label>Uko kimeze</Label>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'like-new', 'good', 'fair'].map((condition) => (
                      <Button
                        key={condition}
                        variant={filters.condition === condition ? 'default' : 'outline'}
                        size="sm"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            condition: filters.condition === condition ? undefined : condition,
                          })
                        }
                      >
                        {condition === 'new' && 'Gishya'}
                        {condition === 'like-new' && 'Nk\'igishya'}
                        {condition === 'good' && 'Nziza'}
                        {condition === 'fair' && 'Isanzwe'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Verified Sellers Only */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified">Abagurisha bemejwe gusa</Label>
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filters.verified || false}
                    onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                    className="h-4 w-4"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Siba byose
                </Button>
                <Button onClick={handleApplyFilters} className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  {t('search')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
