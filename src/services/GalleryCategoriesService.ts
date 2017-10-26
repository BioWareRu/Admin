import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {RestClient} from '../core/HttpClient';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;
import {GalleryCategory} from '../models/GalleryCategory';
import {GalleryCategoriesListResult, SaveGalleryCategoryResponse} from '../results/GalleryCategories';

@Injectable()
export class GalleryCategoriesService extends BaseService<GalleryCategory> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<GalleryCategoriesListResult> {
        return this.getAll('galleryCats', page, perPage, sort).map((res: Response) => deserialize(GalleryCategoriesListResult, res));
    }

    public get(id: number): Observable<GalleryCategory> {
        return this.getOne('galleryCats', id).map((res: Response) => deserialize(GalleryCategory, res));
    }

    add(item: any): Observable<any> {
        return this.doAdd('galleryCats', item).map((res: Response) => deserialize(SaveGalleryCategoryResponse, res));
    }

    update(id: number, item: any): Observable<any> {
        return this.doUpdate('galleryCats', id, item).map((res: Response) => deserialize(SaveGalleryCategoryResponse, res));
    }

    public delete(id: number): Observable<boolean> {
        return this.doDelete('galleryCats', id).map((res: Response) => true);
    }
}
