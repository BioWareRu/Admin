import {Component, OnInit} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ChildFormComponent} from '../../../core/FormComponent';
import {SaveArticleResponse} from '../../../results/Articles';
import {ArticlesCatFormModel} from '../models/ArticleCatFormModel';
import {ActivatedRoute, Router} from '@angular/router';
import {Repository} from '../../../core/Repository';
import {AppState} from '../../../core/AppState';
import {BioFormControl} from '../../../core/forms/BioFormControl';
import {Utils} from '../../../core/Utils';
import {ArticleCategory} from '../../../models/ArticleCategory';
import {Parent} from '../../../models/base/Parent';

@Component({
    moduleId: module.id,
    selector: 'articlesCatForm',
    templateUrl: 'articleCatForm.component.html'
})
export class ArticlesCatFormComponent extends ChildFormComponent<ArticlesCatFormModel, SaveArticleResponse> implements OnInit {
    private articleCatId: number;
    categories: ArticleCategory[];
    public catOptGroups = [];

    constructor(public route: ActivatedRoute, protected repository: Repository, private router: Router, private _appState: AppState) {
        super(repository);
    }

    ngOnInit(): void {
        const id: Observable<number> = this.route.params.map(p => p.id);
        id.subscribe(articleCatId => {
            if (articleCatId > 0) {
                this._appState.notifyDataChanged('title', 'Редактирование категории');
                this.articleCatId = articleCatId;
                this.repository.ArticleCategoriesService.get(articleCatId).subscribe(articleCat => {
                    this.model = <ArticlesCatFormModel>articleCat;
                    this.loadFormDataWithCats();
                });
            } else {
                this._appState.notifyDataChanged('title', 'Добавление категории');
                this.isNew = true;
                this.model = new ArticlesCatFormModel();
                this.loadFormDataWithCats();
            }
        });
    }

    private loadFormDataWithCats() {
        this.repository.ArticleCategoriesService.getList(1, 1000).subscribe((categories) => {
            this.categories = categories.data;
            this.loadFormData();
        });
    }

    protected afterInit() {
        this.buildParentCats(this.model.parent);
    }

    protected getFormGroupConfig(): { [key: string]: AbstractControl; } {
        return {
            title: new BioFormControl('', [<any>Validators.required]),
            url: new BioFormControl('', [<any>Validators.required]),
            descr: new BioFormControl('', []),
            parent: new BioFormControl('', [<any>Validators.required]),
            cat: new BioFormControl('', []),
        };
    }

    protected processSuccessSave(saveResult: SaveArticleResponse) {
        if (!this.articleCatId) {
            this.router.navigate(['/articles/cat', saveResult.Model.id, 'edit']);
        }
    }

    protected doAdd(): Observable<SaveArticleResponse> {
        return this.repository.ArticleCategoriesService.add(this.model);
    }

    protected doUpdate(): Observable<SaveArticleResponse> {
        return this.repository.ArticleCategoriesService.update(this.articleCatId, this.model);
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

    private buildCats(label: string, items: ArticleCategory[]) {
        const group = {
            label,
            options: []
        };
        if (items.length > 0) {
            group.options.push({
                id: null,
                title: 'Нет подкатегории'
            });
            items.forEach((item) => {
                if (this.model.id !== item.id) {
                    if (this.model.catId === item.id) {
                        this.model.cat = item;
                    }
                    group.options.push(item);
                }
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
}
