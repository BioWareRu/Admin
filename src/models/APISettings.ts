import {JsonProperty} from 'json-object-mapper';

export class APISettings {
    @JsonProperty()
    public fileBrowserUrl: string = undefined;
}