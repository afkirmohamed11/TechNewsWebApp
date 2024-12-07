import React from 'react';

interface ArticleFiltersProps {
  viewType: 'latest' | 'popular';
  setViewType: (type: 'latest' | 'popular') => void;
  selectedCategory: string;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  viewType,
  setViewType,
  selectedCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('latest')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === 'latest'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setViewType('popular')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === 'popular'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Popular
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleFilters;