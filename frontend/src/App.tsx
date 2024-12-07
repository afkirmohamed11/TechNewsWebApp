import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleFilters from './components/ArticleFilters';
import { Article, ArticleDetail as ArticleDetailType } from './types/article';
import { api } from './services/api';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetailType | null>(null);
  const [viewType, setViewType] = useState<'latest' | 'popular'>('latest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, viewType]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let fetchedArticles;
      
      if (selectedCategory === 'All') {
        // For All category, first get all articles
        fetchedArticles = await api.getAllArticles();
        
        // Filter based on viewType
        if (viewType === 'latest') {
          // For latest, only show articles where Latest is true
          fetchedArticles = fetchedArticles
            .filter(article => article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        } else {
          // For popular, only show articles where Latest is false
          fetchedArticles = fetchedArticles
            .filter(article => !article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        }
      } else {
        // For specific categories, use the category and sort endpoint
        fetchedArticles = await api.getArticlesByCategoryAndSort(
          selectedCategory,
          viewType === 'latest'
        );
      }
      
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = async (article: Article) => {
    try {
      const articleDetail = await api.getArticleDetail(article.Title, article.Description || '');
      if (articleDetail) {
        setSelectedArticle(articleDetail);
      }
    } catch (error) {
      console.error('Error fetching article detail:', error);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedArticle(null);
    setSelectedCategory(category);
  };

  const handleHomeClick = () => {
    setSelectedArticle(null);
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCategorySelect={handleCategoryClick}
        onHomeClick={handleHomeClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <>
            <ArticleFilters
              viewType={viewType}
              setViewType={setViewType}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategoryClick}
            />
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {selectedCategory === 'All' 
                    ? `No ${viewType} articles available at the moment`
                    : `No ${viewType} articles found for ${selectedCategory}`
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <ArticleCard
                    key={`${article.Title}-${article.Description}`}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;