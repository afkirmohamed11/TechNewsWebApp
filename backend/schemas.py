from pydantic import BaseModel
from datetime import date

class Article(BaseModel):
    Title: str
    Category: str
    imagePath: str | None
    Date_of_publication: date
    Description: str | None
    Latest: bool

    class Config:
        orm_mode = True

class ArticleDetail(Article):
    Content: str
