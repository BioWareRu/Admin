export abstract class Parent {

  public static isEqual(first: Parent, second: Parent) {
    return first && second && first.type === second.type && first.id === second.id;
  }

  public id: any;
  public abstract type: ParentType;

  protected constructor(type: ParentType) {
    this.type = type;
  }

  public abstract getParentOption();

}

export enum ParentType {
  Game = 1,
  Developer = 2,
  Topic = 3
}
