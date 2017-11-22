import {JsonProperty} from 'json-object-mapper';
import {ICat} from './base/ICat';
import {ChildWithCat} from './base/ChildWithCat';

export class GalleryCategory extends ChildWithCat<GalleryCategory> implements ICat {
    @JsonProperty()
    public id: number = undefined;
    @JsonProperty()
    public url: string = undefined;
    @JsonProperty()
    public desc: string = undefined;
    @JsonProperty()
    public parentName: string = undefined;
    @JsonProperty()
    public parentCatName: string = undefined;
    @JsonProperty()
    public title: string = undefined;

    createCat(): GalleryCategory {
        return new GalleryCategory;
    }

    getCatOption() {
        return null;
    }
}
