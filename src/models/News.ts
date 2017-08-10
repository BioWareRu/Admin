import { Parent, ParentType } from './Parent';
import { Game } from './Game';
import { Developer } from './Developer';
import { Topic } from './Topic';
import { JsonProperty } from 'json-typescript-mapper';

export class News {
  @JsonProperty('id')
  public id: number;
  @JsonProperty('url')
  public url: string;
  @JsonProperty('source')
  public source: string;
  @JsonProperty('title')
  public title: string;
  @JsonProperty('shortText')
  public shortText: string;
  @JsonProperty('addText')
  public addText: string;
  @JsonProperty('sticky')
  public sticky: number;
  @JsonProperty('date')
  public date: number;
  @JsonProperty('lastChangeDate')
  public lastChangeDate: number;
  @JsonProperty('pub')
  public pub: number;
  @JsonProperty('gameId')
  public gameId: number;
  @JsonProperty('developerId')
  public developerId: number;
  @JsonProperty('topicId')
  public topicId: number;
  @JsonProperty('authorId')
  public authorId: number;
  @JsonProperty('authorName')
  public authorName: string;
  @JsonProperty('parentName')
  public parentName: string;
  @JsonProperty('publicUrl')
  public publicUrl: string;

  constructor() {
    this.id = undefined;
    this.url = undefined;
    this.source = undefined;
    this.title = undefined;
    this.shortText = undefined;
    this.addText = undefined;
    this.sticky = undefined;
    this.date = undefined;
    this.lastChangeDate = undefined;
    this.pub = undefined;
    this.gameId = undefined;
    this.developerId = undefined;
    this.topicId = undefined;
    this.authorId = undefined;
    this.authorName = undefined;
    this.parentName = undefined;
    this.publicUrl = undefined;
  }

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
