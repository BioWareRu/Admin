import {RestResult} from '../RestResult';
import {JsonProperty} from 'json-object-mapper';

export class SaveModelResponse<T> extends RestResult {
    @JsonProperty()
    public Model: T = undefined;
}