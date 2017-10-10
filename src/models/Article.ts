import {JsonProperty} from 'json-object-mapper';
import {ChildWithCat} from './base/ChildWithCat';
import {ArticleCategory} from './ArticleCategory';

export class Article extends ChildWithCat<ArticleCategory> {
  @JsonProperty()
  public id: number = undefined;
  @JsonProperty()
  public url: string = undefined;
  @JsonProperty()
  public source: string = undefined;
  @JsonProperty()
  public title: string = undefined;
  @JsonProperty()
  public announce: string = undefined;
  @JsonProperty()
  public text: string = undefined;
  @JsonProperty()
  public date: number = undefined;
  @JsonProperty()
  public pub: number = undefined;
  @JsonProperty()
  public gameId: number = undefined;
  @JsonProperty()
  public developerId: number = undefined;
  @JsonProperty()
  public topicId: number = undefined;
  @JsonProperty()
  public authorId: number = undefined;
  @JsonProperty()
  public authorName: string = undefined;
  @JsonProperty()
  public parentName: string = undefined;
  @JsonProperty()
  public publicUrl: string = undefined;
  @JsonProperty()
  public catId: number = undefined;
  @JsonProperty()
  public catName: string = undefined;

  createCat(): ArticleCategory {
    return new ArticleCategory;
  }
}
