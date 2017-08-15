import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Parent, ParentType} from '../../../models/Parent';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../../models/Game';
import {Developer} from '../../../models/Developer';
import {Topic} from '../../../models/Topic';

@Component({
  moduleId: module.id,
  selector: 'app-news-form',
  templateUrl: 'newsForm.component.html'
})
export class NewsFormComponent implements OnInit {

  public news: CreateNewsCommand;

  private games: Game[] = [];
  private developers: Developer[] = [];
  private topics: Topic[] = [];

  public parentOptGroups = [];

  private parent: Parent;

  reactiveFormGroup = new FormGroup({
    title: new FormControl('', [<any>Validators.required]),
    url: new FormControl('', [<any>Validators.required]),
    source: new FormControl('', [<any>Validators.required]),
    shortText: new FormControl('', [<any>Validators.required]),
    addText: new FormControl('', [<any>Validators.required]),
    parent: new FormControl('', [<any>Validators.required])
  });

  constructor(public route: ActivatedRoute, protected repository: Repository) {
  }

  ngOnInit(): void {
    this.news = new CreateNewsCommand();
    this.news.title = 'Новая новость';
    this.news.shortText = 'Супер текст';


    this.repository.GamesService.getList(1, 100).subscribe((games) => {
      this.games = games.data;
      this.buildParents('Игры', this.games);
    });

    this.repository.DevelopersService.getList(1, 100).subscribe((developers) => {
      this.developers = developers.data;
      this.buildParents('Разработчики', this.developers);
    });

    this.repository.TopicsService.getList(1, 100).subscribe((topics) => {
      this.topics = topics.data;
      this.buildParents('Темы', this.topics);
    });

    for (const controlIndex in this.reactiveFormGroup.controls) {
      if (!this.reactiveFormGroup.controls.hasOwnProperty(controlIndex)) {
        continue;
      }
      this.reactiveFormGroup.controls[controlIndex].setValue(this.news[controlIndex]);
    }

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges() {
    const myFormValueChanges$ = this.reactiveFormGroup.valueChanges;

    myFormValueChanges$.subscribe(x => {
      for (const k in x) {
        if (!x.hasOwnProperty(k)) {
          continue;
        }
        this.news[k] = x[k];
      }
      console.log(this.news);
    });
  }

  private buildParents(label: string, items: Parent[]) {
    const group = {
      label,
      options: []
    };
    items.forEach((item) => {
      const option = item.getParentOption();
      if (!this.parent || Parent.isEqual(option, this.news.parent)) {
        this.parent = option;
        this.parentChange();
      }
      group.options.push(option);
    });
    this.parentOptGroups.push(group);
    console.log(this.parentOptGroups);
  }

  public parentChange() {
    this.news.parent = this.parent;
  }
}

class CreateNewsCommand {
  public title: string;
  public shortText: string;
  public gameId: number = undefined;
  public developerId: number = undefined;
  public topicId: number = undefined;

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

    return null;
  }

  set parent(parent: Parent) {
    if (parent === null) {
      return;
    }
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
