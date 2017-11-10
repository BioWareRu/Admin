import {JsonProperty} from 'json-object-mapper';

export class RestResult {
  @JsonProperty()
  public code: number = undefined;
  @JsonProperty()
  public errors: RestError[] = [];
  @JsonProperty()
  public message: string = undefined;
  @JsonProperty()
  public isSuccess: boolean = undefined;
}

export class RestError {
  @JsonProperty()
  public message: string = undefined;
  @JsonProperty()
  public field: string = undefined;
}
