export abstract class Parent {

  public id: any;
  public abstract type: ParentType;
  public title: string;

  protected constructor(type: ParentType) {
    this.type = type;
  }

  public static isEqual(first: Parent, second: Parent) {
    return first && second && first.type === second.type && first.id === second.id;
  }

  public abstract getParentOption();

}

export enum ParentType {
  Game = 1,
  Developer = 2,
  Topic = 3
}
