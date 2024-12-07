from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from crud import (
    get_all_TechArticles,
    get_TechArticle_by_title_and_description,
    get_TechArticles_by_category,
    get_TechArticles_by_category_and_by_latest_or_popular,
    get_all_categories
)
from schemas import Article, ArticleDetail

app = FastAPI()

# Get all articles with optional filters
@app.get("/articles", response_model=list[Article])
def fetch_all_articles(db: Session = Depends(get_db)):
    return get_all_TechArticles(db)

# Get article details by title and description
@app.get("/articles/detail", response_model=ArticleDetail)
def get_article_by_title_and_description(title: str, description: str, db: Session = Depends(get_db)):
    article = get_TechArticle_by_title_and_description(db, title, description)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

# Get articles by category
@app.get("/articles/category", response_model=list[Article])
def fetch_articles_by_category(category: str, db: Session = Depends(get_db)):
    articles = get_TechArticles_by_category(db, category)
    if not articles:
        raise HTTPException(status_code=404, detail="No articles found for this category")
    return articles

# Get all categories
@app.get("/articles/categories", response_model=list[str])
def fetch_categories(db: Session = Depends(get_db)):
    return get_all_categories(db)

# Get articles by category and by latest or popular
@app.get("/articles/category-latest-popular", response_model=list[Article])
def fetch_articles_by_latest_or_popular(category: str, latest_or_popular: bool, db: Session = Depends(get_db)):
    articles = get_TechArticles_by_category_and_by_latest_or_popular(db, category, latest_or_popular)
    if not articles:
        raise HTTPException(status_code=404, detail="No articles found")
    return articles
