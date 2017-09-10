import {ChildWithCat} from '../../../models/Child';
import {IFormModel} from '../../../models/forms/FormModel';

export class ArticlesFormModel extends ChildWithCat implements IFormModel {
  public title: string;
  public announce: string;
  public text: string;
  public source: string;
  public url: string;
}
