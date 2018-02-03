import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router'; 
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Injectable()
export class ProfileGuard implements CanActivate {

	private isAuthed: ProfileService;

	constructor(private _profileService: ProfileService , private _router: Router) {
		console.log("New instance of GUARD")
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		this._profileService.getUserLoggedIn().subscribe(data => {this.isAuthed = data;console.log("SUBSCR DATA" , data)});
		
		if( this.isAuthed ) {
			console.log("canActivate testy test IF..." , this.isAuthed );
			return true;
		}
		else {
			console.log("canActivate testy test ELSE..." , this.isAuthed );
			this._router.navigate(['']);
			return false;
		}
	}
}