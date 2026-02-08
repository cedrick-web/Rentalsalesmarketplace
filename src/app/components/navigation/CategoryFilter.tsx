import { Car, Laptop, Home, Shirt, Wrench, Package, Grid3x3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

const categories = [
  { key: 'vehicles', icon: Car, color: 'text-blue-600' },
  { key: 'electronics', icon: Laptop, color: 'text-purple-600' },
  { key: 'houses', icon: Home, color: 'text-green-600' },
  { key: 'clothing', icon: Shirt, color: 'text-pink-600' },
  { key: 'furniture', icon: Package, color: 'text-orange-600' },
  { key: 'tools', icon: Wrench, color: 'text-gray-600' },
  { key: 'others', icon: Grid3x3, color: 'text-indigo-600' },
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.key;
            
            return (
              <Button
                key={category.key}
                variant={isSelected ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onSelectCategory(isSelected ? null : category.key)}
                className={cn(
                  'flex-shrink-0 gap-2',
                  !isSelected && 'hover:bg-secondary'
                )}
              >
                <Icon className={cn('h-4 w-4', !isSelected && category.color)} />
                <span className="whitespace-nowrap">{t(category.key)}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
