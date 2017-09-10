import {Parent, ParentType} from './Parent';
import {Game} from './Game';
import {Developer} from './Developer';
import {Topic} from './Topic';

export abstract class Child {

  public gameId: number = undefined;
  public developerId: number = undefined;
  public topicId: number = undefined;

  private _parent: Parent;

  get parent(): Parent {
    if (this._parent) {
      return this._parent;
    }
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

    return null;
  }

  set parent(parent: Parent) {
    if (parent === null) {
      return;
    }
    this._parent = parent;
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

export class Cat extends Child {
  public id: number = undefined;
  public title: number = undefined;
  public pid: number = undefined;

  private _parentCat: Cat;

  get parentCat(): Cat {
    if (this._parentCat) {
      return this._parentCat;
    }
    if (this.pid > 0) {
      const parentCat = new Cat();
      parentCat.id = this.pid;
      return parentCat;
    }

    return null;
  }

  set parentCat(parentCat: Cat) {
    if (parentCat === null) {
      return;
    }
    this._parentCat = parentCat;
  }
}

export class ChildWithCat extends Child {
  public catId: number = undefined;

  private _cat: Cat;

  get cat(): Cat {
    if (this._cat) {
      return this._cat;
    }
    if (this.catId > 0) {
      const cat = new Cat();
      cat.id = this.catId;
      return cat;
    }

    return null;
  }

  set cat(cat: Cat) {
    if (cat === null) {
      return;
    }
    this._cat = cat;
    this.catId = cat.id;
  }
}
