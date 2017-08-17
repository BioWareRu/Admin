import {JsonProperty} from 'json-object-mapper';

export class RestResult {
    @JsonProperty()
    public Code: number = undefined;
    @JsonProperty()
    public Errors: RestError[] = [];
}

export interface RestError {
    message: string;
}
