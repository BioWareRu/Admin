import {ListResult} from '../core/lists/ListResult';
import {JsonProperty} from 'json-object-mapper';
import {SaveModelResponse} from '../core/forms/SaveModelResponse';
import {GalleryCategory} from '../models/GalleryCategory';

export class GalleryCategoriesListResult extends ListResult<GalleryCategory> {

    @JsonProperty({type: GalleryCategory, name: 'data'})
    public data: GalleryCategory[];

    constructor() {
        super();
        this.data = undefined;
    }
}

export class SaveGalleryCategoryResponse extends SaveModelResponse<GalleryCategory> {

}
