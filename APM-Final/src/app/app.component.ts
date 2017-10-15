import {Component} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

import {AuthService} from './user/auth.service';
import {MessageService} from './messages/message.service';
import {Shortcut} from './shared/request-recorder.service';
import {RequestRecorded} from './shared/request-recorded.service';

@Component({
             selector: 'pm-app',
             templateUrl: './app/app.component.html'
           })
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
  loading: boolean = true;
  shortcuts: Shortcut[] = [];

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router, private shortcutService: RequestRecorded) {

    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
    this.shortcutService.pathObservable.subscribe(
      shortcut => {
        if (shortcut) {
          this.shortcuts.push(shortcut)
        }
      }
    );
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([ {outlets: {popup: [ 'messages' ]}} ]); // Works
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([ {outlets: {popup: null}} ]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
