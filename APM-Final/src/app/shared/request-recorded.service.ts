import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Shortcut} from './request-recorder.service';

@Injectable()
export class RequestRecorded {
  private pathSubject: BehaviorSubject<Shortcut> = new BehaviorSubject(null);
  private _pathObservable: Observable<Shortcut> = this.pathSubject.asObservable();

  constructor() {
    console.info('instanciation du dispatcher');
  }

  emit(shortcut: Shortcut) {
    if (shortcut) {
      this.pathSubject.next(shortcut)
    }
  }

  get pathObservable(): Observable<Shortcut> {
    return this._pathObservable;
  }
}

