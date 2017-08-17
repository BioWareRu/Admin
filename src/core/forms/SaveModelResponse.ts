import {RestResult} from '../RestResult';
import {JsonProperty} from 'json-object-mapper';

export class SaveModelResponse<T> extends RestResult {

  @JsonProperty({name: 'model'})
  public Model: T = undefined;
}
