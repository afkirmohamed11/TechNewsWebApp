export interface Article {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  datePublished: string;
  description: string;
  content: string;
  likes: number;
  comments: number;
}

export type ArticlePreview = Omit<Article, 'content'>;

export type Category = {
  id: string;
  name: string;
};