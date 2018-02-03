import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { IUsers } from './profile_users';
import { IPosts } from './profile_post';
import { IComments } from './profile_comments';

@Injectable()
export class ProfileService {

	private userUrl = "https://jsonplaceholder.typicode.com/users";
	private postUrl = "https://jsonplaceholder.typicode.com/posts";
	private commentUrl = "https://jsonplaceholder.typicode.com/comments";
	public isUserLoggedIn: boolean;

	constructor(private _http: Http) {
		this.isUserLoggedIn = false;
	}

	//BehaviorSubject allows for data sharing between components
	public loggedInSubject = new BehaviorSubject<any>(null);
	setUserLoggedIn(isLogged) {//Sets user boolean and broadcasts to Guard
		this.isUserLoggedIn = isLogged;
		return this.loggedInSubject.next([this.isUserLoggedIn]);
	}
	getUserLoggedIn():Observable<any> {//Gets user boolean for Guard
		return this.loggedInSubject.asObservable();
	}

	public userIdSubject = new BehaviorSubject<number>(null);
	setUserId(userID){//Sets user ID and broadcasts to Service
		this.userIdSubject.next(userID);
	}
	getUserIdService():Observable<number>{//Gets user ID for Service
		return this.userIdSubject.asObservable();
	}

	getUsers(): Observable<IUsers[]> {//Gets users
		return this._http.get(this.userUrl)
				.map((data: Response) => {return <IUsers[]>data.json()})
				.catch(this.processError)
	}

	getPosts(): Observable<IPosts[]> {//Gets posts
		return this._http.get(this.postUrl)
				.map((data: Response) => {return <IPosts[]>data.json()})
				.catch(this.processError)
	}
	
	getComments(): Observable<IComments[]> {//Gets comments
		return this._http.get(this.commentUrl)
				.map((data: Response) => {return <IComments[]>data.json()})
				.catch(this.processError)
	}
	
	private processError(err: Response) {//Processes API call err
		return Observable.throw(err.statusText);
	}
}