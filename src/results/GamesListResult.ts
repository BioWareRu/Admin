import { ListResult } from '../core/ListResult';
import { JsonProperty } from 'json-typescript-mapper';
import { Game } from '../models/Game';
export class GamesListResult extends ListResult<Game> {

  @JsonProperty({clazz: Game, name: 'data'})
  public data: Game[];

  constructor() {
    super();
    this.data = undefined;
  }
}
