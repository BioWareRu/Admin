import {Model} from './Model';
import {ParentType} from './ParentType';

export abstract class Parent extends Model {
  public abstract type: ParentType;
  public title: string;

  protected constructor(type: ParentType) {
    super();
    this.type = type;
  }

  public static isEqual(first: Parent, second: Parent) {
    return first && second && first.type === second.type && first.id === second.id;
  }

  public abstract getParentOption();
}
