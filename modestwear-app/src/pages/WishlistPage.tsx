import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Heart } from 'lucide-react';
import { Button } from '@/components/common/button';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

// [API: GET /wishlist] - Fetch wishlist

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Save your favorite items to your wishlist
          </p>
          <Link to="/category/all">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}