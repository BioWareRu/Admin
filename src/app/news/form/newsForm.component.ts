import {Component, OnInit} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NewsFormModel} from '../models/NewsFormModel';
import {BioFormControl} from '../../../core/forms/BioFormControl';
import {SaveNewsResponse} from '../../../results/News';
import {Utils} from '../../../core/Utils';
import {ChildFormComponent} from '../../../core/FormComponent';

@Component({
  moduleId: module.id,
  selector: 'newsForm',
  templateUrl: 'newsForm.component.html'
})
export class NewsFormComponent extends ChildFormComponent<NewsFormModel, SaveNewsResponse> implements OnInit {

  private newsId: number;
  protected isPublished = false;

  constructor(public route: ActivatedRoute, protected repository: Repository, private router: Router) {
    super(repository);
  }

  protected getFormGroupConfig(): { [key: string]: AbstractControl; } {
    return {
      title: new BioFormControl('', [<any>Validators.required]),
      url: new BioFormControl('', [<any>Validators.required]),
      source: new BioFormControl('', [<any>Validators.required]),
      shortText: new BioFormControl('', [<any>Validators.required]),
      addText: new BioFormControl('', []),
      parent: new BioFormControl('', [<any>Validators.required])
    };
  }

  protected processSuccessSave(saveResult: SaveNewsResponse) {
    if (!this.newsId) {
      this.router.navigate(['/news', saveResult.Model.id, 'edit']);
    }
  }

  protected doAdd(): Observable<SaveNewsResponse> {
    return this.repository.NewsService.add(this.model);
  }

  protected doUpdate(): Observable<SaveNewsResponse> {
    return this.repository.NewsService.update(this.newsId, this.model);
  }

  protected processChanges(changes: any) {
    if (changes['title']) {
      const origSlug = Utils.slugifyUrl(changes.title.old);
      if (origSlug === this.model.url) {
        this.updateControlValue('url', Utils.slugifyUrl(changes.title.current));
      }
    }
  }

  ngOnInit(): void {
    const id: Observable<number> = this.route.params.map(p => p.id);
    id.subscribe(newsId => {
      if (newsId > 0) {
        this.newsId = newsId;
        this.repository.NewsService.get(newsId).subscribe(news => {
          this.model = <NewsFormModel>news;
          this.isPublished = news.pub === 1;
          this.loadFormData();
        });
      } else {
        this.isNew = true;
        this.model = new NewsFormModel();
        this.model.title = 'Сейчас я напишу клёвую новость!';
        this.model.url = Utils.slugifyUrl(this.model.title);

        this.loadFormData();
      }
    });
  }
}
