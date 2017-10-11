import {IFormModel} from '../../../models/forms/FormModel';
import {Child} from '../../../models/base/Child';

export class NewsFormModel extends Child implements IFormModel {
  public title: string;
  public shortText: string;
  public addText: string;
  public source: string;
  public url: string;
}
