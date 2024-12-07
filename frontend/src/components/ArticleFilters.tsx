import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface ArticleFiltersProps {
  viewType: 'latest' | 'popular';
  setViewType: (type: 'latest' | 'popular') => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  viewType,
  setViewType,
  selectedCategory,
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await api.getCategories();
        setCategories(['All', ...fetchedCategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('latest')}
            className={`px-4 py-2 rounded-full ${
              viewType === 'latest'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setViewType('popular')}
            className={`px-4 py-2 rounded-full ${
              viewType === 'popular'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="animate-pulse h-8 w-20 bg-gray-200 rounded-full"></div>
        ) : categories.length === 1 ? (
          <p className="text-gray-500">No articles</p>
        ) : (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category === 'All' ? 'All' : category}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleFilters;