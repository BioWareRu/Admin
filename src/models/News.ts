import {Parent, ParentType} from './Parent';
import {Game} from './Game';
import {Developer} from './Developer';
import {Topic} from './Topic';
import {JsonProperty} from 'json-object-mapper';
import {forEach} from "@angular/router/src/utils/collection";

export class News {
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

  get parent(): Parent {
    if (this.gameId > 0) {
      const parent = new Game();
      parent.id = this.gameId;
      return parent;
    }

    if (this.developerId > 0) {
      const parent = new Developer();
      parent.id = this.developerId;
      return parent;
    }

    if (this.topicId > 0) {
      const parent = new Topic();
      parent.id = this.topicId;
      return parent;
    }
  }

  set parent(parent: Parent) {
    switch (parent.type) {
      case ParentType.Game:
        this.gameId = parent.id;
        this.developerId = this.topicId = null;
        break;
      case ParentType.Developer:
        this.developerId = parent.id;
        this.gameId = this.topicId = null;
        break;
      case ParentType.Topic:
        this.topicId = parent.id;
        this.developerId = this.gameId = null;
        break;
      default:
        break;
    }
  }
}
