import {Parent, ParentType} from './Parent';
import {Game} from './Game';
import {Developer} from './Developer';
import {Topic} from './Topic';

export abstract class Child {

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
    }

    set parent(parent: Parent) {
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
