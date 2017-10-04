import {Component, Input} from '@angular/core';
import {Model} from '../../../models/Model';
import {ListProvider} from '../ListProvider';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
})
export class ListTableComponent<T extends Model = Model> {
  @Input() public provider: ListProvider<T>;
  @Input() public cardTitle = '';
  @Input() public cardIcon = '';
}
