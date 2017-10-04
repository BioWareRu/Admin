import {ListTableColumnActionType} from './ListEnums';

export class ListTableColumnAction<T> {
  public Icon: string;
  public Title: string;
  public Type: ListTableColumnActionType;
  public GenerateUrl: (model: T) => string;
  public DoClick: (model: T) => any;

  constructor(title: string, icon: string, type: ListTableColumnActionType = ListTableColumnActionType.Click) {
    this.Title = title;
    this.Icon = icon;
    this.Type = type;
  }

  public setClick(click: (model: T) => any): ListTableColumnAction<T> {
    this.Type = ListTableColumnActionType.Click;
    this.DoClick = click;
    return this;
  }

  public setExternal(externalLinkGenerator: (model: T) => string): ListTableColumnAction<T> {
    this.Type = ListTableColumnActionType.ExternalLink;
    this.GenerateUrl = externalLinkGenerator;
    return this;
  }

  public Click(model: T) {
    this.DoClick(model);
  }
}
