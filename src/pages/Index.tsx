
import Wishlist from '@/components/Wishlist';

const Index = () => {
  return (
    <div className="min-h-screen pb-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto pt-12 pb-6">
        <h1 className="text-3xl font-bold mb-2 text-center">My Wishlist</h1>
        <p className="text-muted-foreground text-center mb-8">
          Keep track of all your wishes in one place
        </p>
      </div>
      <Wishlist />
    </div>
  );
};

export default Index;
