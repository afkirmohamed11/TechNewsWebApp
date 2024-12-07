import { Article, Category } from '../types/article';

export const categories: Category[] = [
  { id: 'ai', name: 'AI' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'quantum-computing', name: 'Quantum Computing' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'blockchain', name: 'Blockchain' },
];

export const articles: Article[] = [
  {
    id: 1,
    title: 'AI Breakthrough: New Model Achieves Human-Level Understanding',
    category: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    datePublished: '15/03/2024',
    description: 'Researchers announce a significant advancement in artificial intelligence, with new models showing unprecedented comprehension abilities.',
    content: 'Lorem ipsum dolor sit amet...',
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    title: "The Future of Web Development: What's Next in 2024",
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    datePublished: '14/03/2024',
    description: 'Exploring emerging trends and technologies shaping the future of web development, from WebAssembly to Edge Computing.',
    content: 'Lorem ipsum dolor sit amet...',
    likes: 189,
    comments: 32
  },
  {
    id: 3,
    title: 'Quantum Computing Reaches New Milestone',
    category: 'Quantum Computing',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    datePublished: '13/03/2024',
    description: 'Scientists achieve quantum supremacy in a groundbreaking experiment, opening new possibilities for computing.',
    content: 'Lorem ipsum dolor sit amet...',
    likes: 312,
    comments: 67
  }
];