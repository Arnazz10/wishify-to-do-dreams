
import React, { useState, useEffect } from 'react';
import { WishItem as WishItemType, Category, Priority, DEFAULT_CATEGORIES } from '@/types/wishlist';
import WishItem from './WishItem';
import CategorySelector from './CategorySelector';
import AddWishForm from './AddWishForm';
import { useToast } from '@/components/ui/use-toast';
import { ListCheck } from 'lucide-react';

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishItemType[]>(() => {
    const saved = localStorage.getItem('wishlist-items');
    if (saved) {
      try {
        // Convert string dates back to Date objects
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
      } catch (e) {
        console.error("Error parsing saved wishlist", e);
        return [];
      }
    }
    return [];
  });
  
  const [categories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlist-items', JSON.stringify(items));
  }, [items]);

  const addWish = (title: string, description: string, categoryId: string, priority: Priority) => {
    const newItem: WishItemType = {
      id: `wish-${Date.now()}`,
      title,
      description: description || undefined,
      completed: false,
      priority,
      categoryId,
      createdAt: new Date()
    };
    
    setItems(prev => [newItem, ...prev]);
    
    toast({
      title: "Wish added!",
      description: "Your new wish has been added to the list.",
    });
  };

  const toggleComplete = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteWish = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Wish removed",
      description: "The item has been removed from your wishlist.",
    });
  };

  const changePriority = (id: string, priority: Priority) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, priority } : item
    ));
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.categoryId === selectedCategory);
  
  const completedItems = filteredItems.filter(item => item.completed);
  const pendingItems = filteredItems.filter(item => !item.completed);
  
  // Sort by priority and then by creation date (newest first)
  const sortedPendingItems = [...pendingItems].sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    
    // First sort by priority
    const priorityDifference = priorityValues[b.priority] - priorityValues[a.priority];
    if (priorityDifference !== 0) return priorityDifference;
    
    // Then by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  // Sort completed items by completion date (most recently completed first)
  const sortedCompletedItems = [...completedItems].sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  
  return (
    <div className="max-w-3xl mx-auto">
      <AddWishForm categories={categories} onAddWish={addWish} />
      
      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div>
        {sortedPendingItems.length === 0 && sortedCompletedItems.length === 0 ? (
          <div className="text-center py-10">
            <div className="flex justify-center mb-4">
              <div className="bg-wishlist-purple/10 p-4 rounded-full">
                <ListCheck className="h-8 w-8 text-wishlist-purple" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground">
              Add your first wish using the form above
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Your Wishes ({sortedPendingItems.length})</h2>
              
              {sortedPendingItems.map(item => (
                <WishItem
                  key={item.id}
                  item={item}
                  category={categories.find(c => c.id === item.categoryId) || categories[0]}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteWish}
                  onChangePriority={changePriority}
                />
              ))}
              
              {sortedPendingItems.length === 0 && (
                <p className="text-muted-foreground text-sm py-2">
                  No pending wishes in this category
                </p>
              )}
            </div>
            
            {sortedCompletedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-3 text-muted-foreground">
                  Completed ({sortedCompletedItems.length})
                </h2>
                
                {sortedCompletedItems.map(item => (
                  <WishItem
                    key={item.id}
                    item={item}
                    category={categories.find(c => c.id === item.categoryId) || categories[0]}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteWish}
                    onChangePriority={changePriority}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
