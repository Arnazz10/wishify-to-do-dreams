
import React from 'react';
import { Category } from '@/types/wishlist';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button 
        key="all" 
        onClick={() => onSelectCategory('all')}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          selectedCategory === 'all' 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button 
          key={category.id} 
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
            selectedCategory === category.id 
              ? `bg-${category.color} text-foreground` 
              : `bg-${category.color}/20 text-foreground hover:bg-${category.color}/40`
          )}
        >
          {selectedCategory === category.id && (
            <Check className="w-3.5 h-3.5" />
          )}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
