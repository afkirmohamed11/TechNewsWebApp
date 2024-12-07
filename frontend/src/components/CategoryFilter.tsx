import React from 'react';
import { categories } from '../data/mockData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto py-2">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.name)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category.name
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;