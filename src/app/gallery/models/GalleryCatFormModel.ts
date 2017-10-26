import {IFormModel} from '../../../models/forms/FormModel';
import {ChildWithCat} from '../../../models/base/ChildWithCat';
import {GalleryCategory} from '../../../models/GalleryCategory';

export class GalleryCatFormModel extends ChildWithCat<GalleryCategory> implements IFormModel {
    public title: string;
    public url: string;
    public desc: string;

    createCat(): GalleryCategory {
        return new GalleryCategory();
    }
}
