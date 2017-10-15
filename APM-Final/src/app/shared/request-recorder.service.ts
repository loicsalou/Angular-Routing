import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {RequestRecorded} from './request-recorded.service';

@Injectable()
export class RequestRecorder implements Resolve<Shortcut> {
  constructor(private router: Router, private emitter: RequestRecorded) {
    console.info('instanciation du recorder');
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Shortcut> {
    let url = state.url;
    let i18nLabel = route.component[ 'name' ];
    let paramsString: string = Object.getOwnPropertyNames(route.paramMap[ 'params' ]).reduce(
      (s: string, key: string) => s + key + '=' + route.paramMap[ 'params' ][ key ] + ' ',
      ''
    );
    let shortcut: Shortcut = {url: state.url, label: i18nLabel, params: paramsString};
    this.emitter.emit(shortcut);
    return Observable.of(shortcut);
  }
}

export interface Shortcut {
  url: string;
  label: string;
  params: string;
}
