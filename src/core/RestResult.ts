import {JsonProperty} from 'json-object-mapper';

export class RestResult {
    @JsonProperty('code')
    public Code: number = undefined;
    @JsonProperty('errors')
    public Errors: RestError[] = [];
}

export interface RestError {
    message: string;
}
