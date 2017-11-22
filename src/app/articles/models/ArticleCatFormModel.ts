import {IFormModel} from '../../../models/forms/FormModel';
import {ChildWithCat} from '../../../models/base/ChildWithCat';
import {ArticleCategory} from '../../../models/ArticleCategory';

export class ArticlesCatFormModel extends ChildWithCat<ArticleCategory> implements IFormModel {
    public title: string;
    public url: string;
    public descr: string;
    public content: string;

    createCat(): ArticleCategory {
        return new ArticleCategory();
    }
}
