import React, { useState } from 'react';
import { categories } from '../data/mockData';
import { NewspaperIcon, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, onHomeClick }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <NewspaperIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Tech News Dashboard</h1>
        </div>
        
        <div className="relative">
          <button
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            className="px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Categories
            <ChevronDown className="h-4 w-4" />
          </button>

          {showCategories && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button
                onClick={() => {
                  onCategorySelect('All');
                  setShowCategories(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect(category.name);
                    setShowCategories(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;