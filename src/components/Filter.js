'use client'
import { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    onFilterChange({ price: e.target.value, rating });
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    onFilterChange({ price, rating: e.target.value });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-lg  md:fixed ">
      <h2 className="text-md font-semibold text-gray-800 mb-4">Filters</h2>
      <div className="mb-6">
        <label htmlFor="price" className="block text-xs font-medium text-gray-600 mb-2">Max Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter max price"
          className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 text-sm focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="rating" className="block text-xs font-medium text-gray-600 mb-2">Min Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={handleRatingChange}
          className="w-full border text-xs border-gray-300 rounded-lg px-4 py-2 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
