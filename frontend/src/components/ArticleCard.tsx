import React from 'react';
import { ArticlePreview } from '../types/article';

interface ArticleCardProps {
  article: ArticlePreview;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <article 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.datePublished}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600">{article.description}</p>
      </div>
    </article>
  );
};

export default ArticleCard;