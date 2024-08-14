'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const CartPage = () => {
  const { cart, updateQuantity } = useCart();
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [validCoupon, setValidCoupon] = useState(null);

  const couponCodes = {
    'SAVE10': 10, // 10% discount
    'OFF20': 20,  // $20 off
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = subtotal * (discountValue / 100);
  } else if (discountType === 'fixed') {
    discountAmount = parseFloat(discountValue) || 0;
  }

  if (validCoupon) {
    if (couponCodes[validCoupon]) {
      const couponDiscount = couponCodes[validCoupon];
      discountAmount = discountType === 'percentage' ? subtotal * (couponDiscount / 100) : couponDiscount;
    }
  }

  const total = subtotal - discountAmount;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    updateQuantity(productId, newQuantity);
  };

  const applyCoupon = () => {
    if (couponCodes[couponCode]) {
      setValidCoupon(couponCode);
    } else {
      setValidCoupon(null);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true}/>
      <div className="container mx-auto p-4 mt-20 border-2 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty. <Link href="/" className="text-blue-500">Continue Shopping</Link></p>
        ) : (
          <>
            <div className="mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 text-center mx-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-8">
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-2">Apply Discount</h2>
                <div className="mb-4">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                  <input
                    id="coupon"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-3"
                  />
                  <button
                    onClick={applyCoupon}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Apply Coupon
                  </button>
                  <p className='text-xs mt-5'>
                    <li>SAVE10: 10% off</li>
                    <li>OFF20: $20 off</li>
                  </p>
                  {validCoupon === null && couponCode && (
                    <p className="mt-2 text-red-500">Invalid coupon code.</p>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-4 font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  onClick={() => toast.success('Proceeding to checkout...')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
