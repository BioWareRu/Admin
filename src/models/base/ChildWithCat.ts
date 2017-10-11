import {Child} from './Child';
import {ICat} from './ICat';

export abstract class ChildWithCat<TCat extends ICat> extends Child {

  public catId: number = undefined;

  private _cat: TCat;

  get cat(): TCat {
    if (this._cat) {
      return this._cat;
    }
    if (this.catId > 0) {
      const cat = this.createCat();
      cat.id = this.catId;
      return cat;
    }

    return null;
  }

  set cat(cat: TCat) {
    if (cat === null) {
      return;
    }
    this._cat = cat;
    this.catId = cat.id;
  }

  public static compareCats(cat1: ICat, cat2: ICat) {
    return cat1 && cat2 && cat1.id === cat2.id;
  }

  abstract createCat(): TCat;
}
