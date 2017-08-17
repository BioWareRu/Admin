import {JsonProperty} from 'json-object-mapper';
import {Child} from './Child';

export class News extends Child {
    @JsonProperty()
    public id: number = undefined;
    @JsonProperty()
    public url: string = undefined;
    @JsonProperty()
    public source: string = undefined;
    @JsonProperty()
    public title: string = undefined;
    @JsonProperty()
    public shortText: string = undefined;
    @JsonProperty()
    public addText: string = undefined;
    @JsonProperty()
    public sticky: number = undefined;
    @JsonProperty()
    public date: number = undefined;
    @JsonProperty()
    public lastChangeDate: number = undefined;
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
}
