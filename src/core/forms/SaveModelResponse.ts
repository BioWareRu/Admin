import {RestResult} from '../RestResult';
import {JsonProperty} from 'json-object-mapper';

export class SaveModelResponse<T> extends RestResult {
    @JsonProperty('model')
    public Model: T = undefined;
}