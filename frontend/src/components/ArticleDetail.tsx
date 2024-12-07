import React from 'react';
import { Article } from '../types/article';
import { ArrowLeft } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles
      </button>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-gray-500">{article.datePublished}</span>
        </div>
        
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            {article.content}
          </p>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;