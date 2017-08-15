import {ChildFormModel} from '../../../models/forms/FormModel';
import {News} from '../../../models/News';

export class NewsFormModel extends ChildFormModel {
    public title: string;
    public shortText: string;
    public addText: string;
    public source: string;
    public url: string;

    public static createFromNews(news: News): NewsFormModel {
        const model = new NewsFormModel();
        model.developerId = news.developerId;
        model.gameId = news.gameId;
        model.topicId = news.topicId;
        model.source = news.source;
        model.url = news.url;
        model.title = news.title;
        model.shortText = news.shortText;
        model.addText = news.addText;
        return model;
    }

}
