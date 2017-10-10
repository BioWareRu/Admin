import {JsonProperty} from 'json-object-mapper';
import {ICat} from './base/ICat';
import {ChildWithCat} from './base/ChildWithCat';

export class ArticleCategory extends ChildWithCat<ArticleCategory> implements ICat {
  @JsonProperty()
  public id: number = undefined;
  @JsonProperty()
  public url: string = undefined;
  @JsonProperty()
  public descr: string = undefined;
  @JsonProperty()
  public content: string = undefined;
  @JsonProperty()
  public parentName: string = undefined;
  @JsonProperty()
  public parentCatName: string = undefined;
  @JsonProperty()
  public title: string = undefined;

  createCat(): ArticleCategory {
    return new ArticleCategory;
  }

  getCatOption() {
    return null;
  }
}
