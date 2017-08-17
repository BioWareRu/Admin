import {AbstractControl, FormGroup} from '@angular/forms';
import {BioFormControl} from './forms/BioFormControl';
import {Game} from '../models/Game';
import {Developer} from '../models/Developer';
import {Topic} from '../models/Topic';
import {Observable} from 'rxjs/Observable';
import {Parent} from '../models/Parent';
import {Child} from '../models/Child';
import {Repository} from './Repository';

export abstract class FormComponent<TModel, TResultModel> {
  public success = false;
  public hasErrors = false;
  public hasChanges = false;

  public isNew = false;

  public formLoaded = false;

  public formGroup: FormGroup;

  public model: TModel;

  protected abstract getFormGroupConfig(): { [key: string]: AbstractControl; };

  protected abstract processSuccessSave(saveResult: TResultModel);

  protected abstract doAdd(): Observable<TResultModel>;

  protected abstract doUpdate(): Observable<TResultModel>;

  protected abstract processChanges(changes);

  initForm() {

    this.formGroup = new FormGroup(this.getFormGroupConfig());

    // noinspection TsLint
    for (const controlIndex in this.formGroup.controls) {
      this.updateControlValue(controlIndex, this.model[controlIndex]);
    }

    this.subscribeToFormChanges();

    this.formLoaded = true;
  }

  subscribeToFormChanges() {
    const myFormValueChanges$ = this.formGroup.valueChanges;

    myFormValueChanges$.subscribe(x => {
      const changes = {};
      for (const k in x) {
        if (!x.hasOwnProperty(k)) {
          continue;
        }
        if (this.model[k] !== x[k]) {
          this.hasChanges = true;
          this.hasErrors = false;
          this.success = false;
          const orig = this.model[k];
          this.model[k] = x[k];
          changes[k] = {
            old: orig,
            current: x[k]
          };
          (<BioFormControl>this.formGroup.controls[k]).ServerErrors = [];
        }
      }
      if (changes) {
        this.processChanges(changes);
      }
    });
  }

  protected updateControlValue(controlKey, value) {
    if (!this.formGroup.controls.hasOwnProperty(controlKey)) {
      return;
    }
    this.formGroup.controls[controlKey].setValue(value);
  }

  public save() {
    this.success = false;
    this.hasChanges = false;
    let result;
    if (this.isNew) {
      result = this.doAdd();
    } else {
      result = this.doUpdate();
    }
    result.subscribe((saveResult: TResultModel) => {
      this.success = true;
      this.processSuccessSave(saveResult);
    }, e => {
      this.hasErrors = true;
      this.handleSubmitError(e);
    });
  }

  protected handleSubmitError(response: any) {
    if (response.status === 422) {
      const data = response.json();
      data.errors.forEach((error) => {
        (<BioFormControl>this.formGroup.controls[error.field]).ServerErrors.push(error.message);
        this.formGroup.controls[error.field].setErrors({'server': true});
      });
    }
  }
}

export abstract class ChildFormComponent<TModel extends Child, TSaveModel> extends FormComponent<TModel, TSaveModel> {
  private games: Game[] = [];
  private developers: Developer[] = [];
  private topics: Topic[] = [];
  public parentOptGroups = [];

  constructor(protected repository: Repository) {
    super();
  }

  protected loadFormData() {
    Observable.forkJoin(
      this.repository.GamesService.getList(1, 100),
      this.repository.DevelopersService.getList(1, 100),
      this.repository.TopicsService.getList(1, 100)
    ).subscribe(
      res => {
        this.games = res[0].data;
        this.buildParents('Игры', this.games);
        this.developers = res[1].data;
        this.buildParents('Разработчики', this.developers);
        this.topics = res[2].data;
        this.buildParents('Темы', this.topics);
        this.initForm();
      }
    );
  }

  public compareParents(parent1: Parent, parent2: Parent) {
    return parent1 && parent2 && parent1.type === parent2.type && parent1.id === parent2.id;
  }

  private buildParents(label: string, items: Parent[]) {
    const group = {
      label,
      options: []
    };
    items.forEach((item) => {
      const option = item.getParentOption();
      if (!this.model.parent || Parent.isEqual(option, this.model.parent)) {
        this.model.parent = option;
      }
      group.options.push(option);
    });
    this.parentOptGroups.push(group);
  }
}
