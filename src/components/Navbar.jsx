'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { CiShop } from 'react-icons/ci';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 z-30 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white font-bold text-xl" href="/">
          E-Commerce
        </Link>
        <div className="relative">
          <Link className="text-white font-bold flex items-center" href="/cart">
            <CiShop size={30} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
