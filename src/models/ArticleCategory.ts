import {Cat} from './Child';
import {JsonProperty} from 'json-object-mapper';

export class ArticleCategory extends Cat {
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
}
