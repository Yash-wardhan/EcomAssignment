'use client'
import { useState } from 'react';
import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
import Navbar from '@/components/Navbar';

const applyFilters = (products, filters) => {
  return products.filter(product => {
    const priceMatch = filters.price ? product.price <= filters.price : true;
    const ratingMatch = filters.rating ? product.rating.rate >= filters.rating : true;
    return priceMatch && ratingMatch;
  });
};

export default function Home() {
  const [filters, setFilters] = useState({ price: '', rating: '' });
  const filteredProducts = applyFilters(products, filters);

  return (
    <div>
        <Navbar />
        <div className="flex container mx-auto mt-20 gap-10 p-4 flex-col md:flex-row">
          <div className="md:w-1/4">
            <Filter onFilterChange={setFilters}/>
          </div>
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}