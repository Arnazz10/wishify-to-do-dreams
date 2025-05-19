
export type Priority = 'low' | 'medium' | 'high';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type WishItem = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  categoryId: string;
  createdAt: Date;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'personal', name: 'Personal', color: 'wishlist-purple' },
  { id: 'work', name: 'Work', color: 'wishlist-blue' },
  { id: 'shopping', name: 'Shopping', color: 'wishlist-peach' },
  { id: 'travel', name: 'Travel', color: 'wishlist-green' },
  { id: 'gift', name: 'Gift Ideas', color: 'wishlist-pink' },
  { id: 'other', name: 'Other', color: 'wishlist-gray' },
];
