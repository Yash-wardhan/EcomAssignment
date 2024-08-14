'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    toast.success('Successfully Added to Carts')
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="border hover:shadow-lg cursor-pointer border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between bg-white">
      <Toaster position="top-center" reverseOrder={true}/>
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-48 mx-auto h-full object-cover rounded-md mb-4"
      />

      {/* Product Title */}
      <h3 className="text-sm font-semibold mb-2">{product.title}</h3>

      {/* Product Description */}
      <p className="text-gray-600 mb-2 text-xs">
        {product.description.length > 120
          ? `${product.description.slice(0, 120)}...`
          : product.description}
      </p>

      {/* Product Price */}
      <p className="text-sm font-bold mb-4">${product.price.toFixed(2)}</p>

      {/* Product Rating */}
      <div className="flex items-center mb-4">
        {[...Array(Math.floor(product.rating.rate))].map((_, i) => (
          <svg
            key={i}
            className="w-2 h-2 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.425 8.132 1.18-5.884 5.73 1.386 8.093L12 17.751 6.698 22.015l1.386-8.093-5.884-5.73 8.132-1.18L12 .587z" />
          </svg>
        ))}
        {product.rating.rate % 1 > 0 && (
          <svg
            className="w-2 h-2 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.425 8.132 1.18-5.884 5.73 1.386 8.093L12 17.751 6.698 22.015l1.386-8.093-5.884-5.73 8.132-1.18L12 .587z" />
          </svg>
        )}
        <p className="text-gray-500 ml-2 text-xs">({product.rating.count} reviews)</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-2 rounded-md font-semibold text-white transition-colors duration-300 ${
          isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isAdded ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;