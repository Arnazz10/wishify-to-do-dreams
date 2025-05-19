
import React, { useState } from 'react';
import { Category } from '@/types/wishlist';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddWishFormProps {
  categories: Category[];
  onAddWish: (title: string, description: string, categoryId: string, priority: "low" | "medium" | "high") => void;
}

const AddWishForm: React.FC<AddWishFormProps> = ({ categories, onAddWish }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddWish(title, description, categoryId, priority);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center">
        <Input
          placeholder="Add a new wish to your list..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value && !isExpanded) {
              setIsExpanded(true);
            }
          }}
          className="rounded-r-none focus-visible:ring-1 focus-visible:ring-offset-0"
        />
        <Button type="submit" className="rounded-l-none">
          <Plus className="h-5 w-5 mr-2" />
          Add
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-3 animate-fade-in">
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-[48%]">
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-[48%]">
              <label className="text-sm font-medium mb-1 block">Priority</label>
              <Select value={priority} onValueChange={(val: "low" | "medium" | "high") => setPriority(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddWishForm;
