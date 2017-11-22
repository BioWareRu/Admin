import {AbstractControl, FormGroup} from '@angular/forms';
import {BioFormControl} from './forms/BioFormControl';
import {Game} from '../models/Game';
import {Developer} from '../models/Developer';
import {Topic} from '../models/Topic';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {Repository} from './Repository';
import {Parent} from '../models/base/Parent';
import {Child} from '../models/base/Child';
import {HttpErrorResponse} from '@angular/common/http';
import {ObjectMapper} from 'json-object-mapper';
import {RestResult} from './RestResult';
import deserialize = ObjectMapper.deserialize;

export abstract class FormComponent<TModel, TResultModel> {
  public success = false;
  public hasErrors = false;
  public hasChanges = false;

  public isNew = false;

  public formLoaded = false;

  public formGroup: FormGroup;

  public model: TModel;

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

  protected abstract getFormGroupConfig(): { [key: string]: AbstractControl; };

  protected abstract processSuccessSave(saveResult: TResultModel);

  protected abstract doAdd(): Observable<TResultModel>;

  protected abstract doUpdate(): Observable<TResultModel>;

  protected abstract processChanges(changes);

  protected updateControlValue(controlKey, value) {
    if (!this.formGroup.controls.hasOwnProperty(controlKey)) {
      return;
    }
    this.formGroup.controls[controlKey].setValue(value);
  }

  protected handleSubmitError(response: HttpErrorResponse) {
    if (response.status === 422) {
      const data = deserialize(RestResult, JSON.parse(response.error));
      data.errors.forEach((error) => {
        (<BioFormControl>this.formGroup.controls[error.field]).ServerErrors.push(error.message);
        this.formGroup.controls[error.field].setErrors({'server': true});
      });
    }
  }

  protected afterInit() {
  }
}

export abstract class ChildFormComponent<TModel extends Child, TSaveModel> extends FormComponent<TModel, TSaveModel> {
  public parentOptGroups = [];
  private games: Game[] = [];
  private developers: Developer[] = [];
  private topics: Topic[] = [];

  constructor(protected repository: Repository) {
    super();
  }

  public compareParents(parent1: Parent, parent2: Parent) {
    return parent1 && parent2 && parent1.type === parent2.type && parent1.id === parent2.id;
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
        this.afterInit();
      }
    );
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
