import {Injectable} from '@angular/core';
import {HttpClient} from '../core/HttpClient';
import {Observable} from 'rxjs/Rx';
import {APISettings} from '../models/APISettings';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;

@Injectable()
export class SettingsService {
    constructor(private httpClient: HttpClient) {
    }

    public get (): Observable<APISettings> {
        return this.httpClient.get('settings', {}).map((res: Response) => deserialize(APISettings, res.json()));
    }
}
