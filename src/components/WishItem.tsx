
import React from 'react';
import { WishItem as WishItemType, Category, Priority } from '@/types/wishlist';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { X, BookmarkMinus, BookmarkPlus, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WishItemProps {
  item: WishItemType;
  category: Category;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangePriority: (id: string, priority: Priority) => void;
}

const priorityIcons = {
  low: <BookmarkMinus className="h-4 w-4" />,
  medium: <ListTodo className="h-4 w-4" />,
  high: <BookmarkPlus className="h-4 w-4" />
};

const priorityLabels = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority"
};

const WishItem: React.FC<WishItemProps> = ({
  item,
  category,
  onToggleComplete,
  onDelete,
  onChangePriority
}) => {
  const handlePriorityChange = () => {
    const nextPriority: Record<Priority, Priority> = {
      low: 'medium',
      medium: 'high',
      high: 'low'
    };
    onChangePriority(item.id, nextPriority[item.priority]);
  };

  return (
    <div className={cn(
      "p-4 mb-3 rounded-lg border flex items-start gap-3 animate-fade-in group transition-all",
      item.completed ? "bg-muted/50" : "bg-card",
      `border-${category.color}/20 hover:border-${category.color}/50`
    )}>
      <Checkbox 
        checked={item.completed}
        onCheckedChange={() => onToggleComplete(item.id)}
        className={cn(
          "mt-1",
          `data-[state=checked]:bg-${category.color} data-[state=checked]:border-${category.color}`
        )}
      />

      <div className="flex-1 min-w-0">
        <div className={cn(
          "text-base font-medium",
          item.completed && "line-through text-muted-foreground"
        )}>
          {item.title}
        </div>
        {item.description && (
          <div className={cn(
            "text-sm text-muted-foreground mt-0.5",
            item.completed && "line-through"
          )}>
            {item.description}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePriorityChange}
                className={cn(
                  "h-8 w-8",
                  item.priority === 'high' && "text-wishlist-pink",
                  item.priority === 'medium' && "text-wishlist-yellow",
                  item.priority === 'low' && "text-muted-foreground"
                )}
              >
                {priorityIcons[item.priority]}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{priorityLabels[item.priority]} - Click to change</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(item.id)}
          className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WishItem;
