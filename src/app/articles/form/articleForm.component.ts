import {Component, OnInit} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BioFormControl} from '../../../core/forms/BioFormControl';
import {Utils} from '../../../core/Utils';
import {ChildFormComponent} from '../../../core/FormComponent';
import {Parent} from '../../../models/Parent';
import {CustomValidators} from 'ng2-validation';
import {AppState} from '../../../core/AppState';
import {ArticlesFormModel} from '../models/ArticlesFormModel';
import {SaveArticleResponse} from '../../../results/Articles';
import {ArticleCategory} from '../../../models/ArticleCategory';
import {Cat} from '../../../models/Child';

@Component({
  moduleId: module.id,
  selector: 'articleForm',
  templateUrl: 'articleForm.component.html'
})
export class ArticleFormComponent extends ChildFormComponent<ArticlesFormModel, SaveArticleResponse> implements OnInit {
  categories: ArticleCategory[];
  public catOptGroups = [];
  protected isPublished = false;
  private articleId: number;

  constructor(public route: ActivatedRoute, protected repository: Repository, private router: Router, private _appState: AppState) {
    super(repository);
  }

  protected static getParentTitle(parent: Parent) {
    return parent.title + ' — ';
  }

  ngOnInit(): void {
    const id: Observable<number> = this.route.params.map(p => p.id);
    id.subscribe(articleId => {
      if (articleId > 0) {
        this._appState.notifyDataChanged('title', 'Редактирование статьи');
        this.articleId = articleId;
        this.repository.ArticlesService.get(articleId).subscribe(article => {
          this.model = <ArticlesFormModel>article;
          this.isPublished = article.pub === 1;
          this.loadFormDataWithCats();
        });
      } else {
        this._appState.notifyDataChanged('title', 'Добавление статьи');
        this.isNew = true;
        this.model = new ArticlesFormModel();
        this.loadFormDataWithCats();
      }
    });
  }

  protected afterInit() {
    if (this.isNew) {
      this.updateControlValue('title', ArticleFormComponent.getParentTitle(this.model.parent));
    }
    this.buildParentCats(this.model.parent);
  }

  protected getFormGroupConfig(): { [key: string]: AbstractControl; } {
    return {
      title: new BioFormControl('', [<any>Validators.required]),
      url: new BioFormControl('', [<any>Validators.required]),
      source: new BioFormControl('', [<any>Validators.required, CustomValidators.url]),
      announce: new BioFormControl('', []),
      text: new BioFormControl('', [<any>Validators.required]),
      parent: new BioFormControl('', [<any>Validators.required]),
      cat: new BioFormControl('', [<any>Validators.required]),
    };
  }

  protected processSuccessSave(saveResult: SaveArticleResponse) {
    if (!this.articleId) {
      this.router.navigate(['/articles', saveResult.Model.id, 'edit']);
    }
  }

  protected doAdd(): Observable<SaveArticleResponse> {
    return this.repository.ArticlesService.add(this.model);
  }

  protected doUpdate(): Observable<SaveArticleResponse> {
    return this.repository.ArticlesService.update(this.articleId, this.model);
  }

  protected processChanges(changes: any) {
    if (changes['title']) {
      const origSlug = Utils.slugifyUrl(changes.title.old);
      if (!this.model.url || origSlug === this.model.url) {
        this.updateControlValue('url', Utils.slugifyUrl(changes.title.current));
      }
    }
    if (changes['parent']) {
      this.buildParentCats(changes.parent.current);
    }
  }

  private buildParentCats(parent: Parent) {
    const cats = [];
    this.categories.forEach((cat) => {
      if (Parent.isEqual(cat.parent, parent)) {
        cats.push(cat);
      }
    });
    this.buildCats('', cats);
  }

  protected publish() {
    this.repository.ArticlesService.publish(this.articleId).subscribe((res: boolean) => {
      this.isPublished = res;
    }, err => {
      this.isPublished = false;
    });
  }

  protected unpublish() {
    this.repository.ArticlesService.unpublish(this.articleId).subscribe((res: boolean) => {
      this.isPublished = res;
    }, err => {
      this.isPublished = true;
    });
  }

  protected canPublish(): boolean {
    return !this.isNew && !this.isPublished;
  }

  protected canUnPublish(): boolean {
    return !this.isNew && this.isPublished;
  }

  private loadFormDataWithCats() {
    this.repository.ArticleCategoriesService.getList(1, 1000).subscribe((categories) => {
      this.categories = categories.data;
      this.loadFormData();
    });
  }

  private buildCats(label: string, items: ArticleCategory[]) {
    const group = {
      label,
      options: []
    };
    if (items.length > 0) {
      items.forEach((item) => {
        if (!this.model.cat || this.model.catId === item.id) {
          this.model.cat = item;
        }
        group.options.push(item);
      });
    } else {
      group.options.push({
        id: null,
        title: 'Нет категорий'
      });
    }
    if (this.model.cat == null) {
      this.model.cat = group.options[0];
    }
    this.catOptGroups = [group];
    this.updateControlValue('cat', this.model.cat);
  }

  public compareCats(cat1: Cat, cat2: Cat) {
    return cat1 && cat2 && cat1.id === cat2.id;
  }
}
