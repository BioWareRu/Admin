import { NewsService } from '../services/NewsService';
import { ArticlesService } from '../services/ArticlesService';
import { GamesService } from '../services/GamesService';
import { DevelopersService } from '../services/DevelopersService';
import { TopicsService } from '../services/TopicsService';
import { Injectable } from '@angular/core';
import {ArticlesCategoriesService} from '../services/ArticleCategoriesService';
import {GalleryCategoriesService} from '../services/GalleryCategoriesService';

@Injectable()
export class Repository {
  public constructor(private _newsService: NewsService,
                     private _articlesService: ArticlesService,
                     private _articleCategoriesService: ArticlesCategoriesService,
                     private _gamesService: GamesService,
                     private _developersService: DevelopersService,
                     private _topicsService: TopicsService,
                     private _galleryCategoriesService: GalleryCategoriesService) {

  }

  get NewsService(): NewsService {
    return this._newsService;
  }

  get ArticlesService(): ArticlesService {
    return this._articlesService;
  }

  get ArticleCategoriesService(): ArticlesCategoriesService {
    return this._articleCategoriesService;
  }

  get GamesService(): GamesService {
    return this._gamesService;
  }

  get DevelopersService(): DevelopersService {
    return this._developersService;
  }

  get TopicsService(): TopicsService {
    return this._topicsService;
  }

  get GalleryCategoriesService(): GalleryCategoriesService {
    return this._galleryCategoriesService;
  }
}
