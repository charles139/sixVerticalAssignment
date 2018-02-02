import { Component } from '@angular/core';
import { ProfileService }  from './profile/profile.service';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
  providers: [ProfileService]
})
export class AppComponent  { }
