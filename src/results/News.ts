import {ListResult} from '../core/lists/ListResult';
import {News} from '../models/News';
import {JsonProperty} from 'json-object-mapper';
import {SaveModelResponse} from '../core/forms/SaveModelResponse';

export class NewsListResult extends ListResult<News> {

    @JsonProperty({type: News, name: 'data'})
    public data: News[];

    constructor() {
        super();
        this.data = undefined;
    }
}

export class SaveNewsResponse extends SaveModelResponse<News> {

}
