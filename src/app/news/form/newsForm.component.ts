import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Parent} from '../../../models/Parent';
import {Repository} from '../../../core/Repository';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../../models/Game';
import {Developer} from '../../../models/Developer';
import {Topic} from '../../../models/Topic';
import {Observable} from 'rxjs/Observable';
import {NewsFormModel} from '../models/NewsFormModel';

@Component({
    moduleId: module.id,
    selector: 'newsForm',
    templateUrl: 'newsForm.component.html'
})
export class NewsFormComponent implements OnInit {

    public news: NewsFormModel;

    private games: Game[] = [];
    private developers: Developer[] = [];
    private topics: Topic[] = [];

    public parentOptGroups = [];

    public formInited = false;

    private parent: Parent;

    reactiveFormGroup = new FormGroup({
        title: new FormControl('', [<any>Validators.required]),
        url: new FormControl('', [<any>Validators.required]),
        source: new FormControl('', [<any>Validators.required]),
        shortText: new FormControl('', [<any>Validators.required]),
        addText: new FormControl('', []),
        parent: new FormControl('', [<any>Validators.required])
    });

    constructor(public route: ActivatedRoute, protected repository: Repository) {
    }

    ngOnInit(): void {

        const id: Observable<number> = this.route.params.map(p => p.id);
        id.subscribe(newsId => {
            if (newsId > 0) {
                this.repository.NewsService.get(newsId).subscribe(news => {
                    this.news = <NewsFormModel>news;
                    this.loadFormData();
                });
            } else {
                this.news = new NewsFormModel();
                this.news.title = 'Напиши клёвую новость!';

                this.loadFormData();
            }
        });


        /* this.repository.GamesService.getList(1, 100).subscribe((games) => {
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
         });*/


    }

    loadFormData() {
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

                console.log(this.parentOptGroups);
                console.log(this.news.parent);

                this.initForm();
            }
        );
    }

    initForm() {
        for (const controlIndex in this.reactiveFormGroup.controls) {
            if (!this.reactiveFormGroup.controls.hasOwnProperty(controlIndex)) {
                continue;
            }
            this.reactiveFormGroup.controls[controlIndex].setValue(this.news[controlIndex]);
        }

        this.subscribeToFormChanges();

        this.formInited = true;
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
            if (!this.news.parent || Parent.isEqual(option, this.news.parent)) {
                this.news.parent = option;
            }
            group.options.push(option);
        });
        this.parentOptGroups.push(group);
    }

    public compareParents(parent1: Parent, parent2: Parent) {
        return parent1 && parent2 && parent1.type === parent2.type && parent1.id === parent2.id;
    }
}