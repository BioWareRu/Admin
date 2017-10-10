import {IFormModel} from '../../../models/forms/FormModel';
import {ChildWithCat} from '../../../models/base/ChildWithCat';
import {ArticleCategory} from '../../../models/ArticleCategory';

export class ArticlesFormModel extends ChildWithCat<ArticleCategory> implements IFormModel {
  public title: string;
  public announce: string;
  public text: string;
  public source: string;
  public url: string;

  createCat(): ArticleCategory {
    return new ArticleCategory();
  }
}
