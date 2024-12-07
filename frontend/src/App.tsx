import React, { useState } from 'react';
import { articles } from './data/mockData';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleFilters from './components/ArticleFilters';
import { Article } from './types/article';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [viewType, setViewType] = useState<'latest' | 'popular'>('latest');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (viewType === 'latest') {
      return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
    }
    return b.likes - a.likes;
  });

  const handleHomeClick = () => {
    setSelectedArticle(null);
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCategorySelect={setSelectedCategory} 
        onHomeClick={handleHomeClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <>
            <ArticleFilters
              viewType={viewType}
              setViewType={setViewType}
              selectedCategory={selectedCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;