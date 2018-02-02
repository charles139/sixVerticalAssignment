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
		console.log("NEW INSTANCE OF SERVICE");
	}

	public loggedInSubject = new BehaviorSubject<boolean>(null);
	setUserLoggedIn(isLogged) {
		this.isUserLoggedIn = isLogged;
		console.log("Is USER SET TO LOGIN" , this.isUserLoggedIn);
		return this.loggedInSubject.next([this.isUserLoggedIn]);
	}
	getUserLoggedIn():Observable<boolean> {
		return this.loggedInSubject.asObservable();
	}

	getUsers(): Observable<IUsers[]> {
		return this._http.get(this.userUrl)
				.map((data: Response) => {console.log(data);return <IUsers[]>data.json()})
				.catch(this.processError)
	}

	getPosts(): Observable<IPosts[]> {
		return this._http.get(this.postUrl)
				.map((data: Response) => {console.log("This is POSTS data" , data);return <IPosts[]>data.json()})
				.catch(this.processError)
	}
	
	getComments(): Observable<IComments[]> {
		return this._http.get(this.commentUrl)
				.map((data: Response) => {console.log("This is COMMENTS data" , data);return <IComments[]>data.json()})
				.catch(this.processError)
	}
	
	private processError(err: Response) {
		return Observable.throw(err.statusText);
	}

	public userIdSubject = new BehaviorSubject<number>(null);
	setUserId(userID){
		this.userIdSubject.next(userID);
	}
	getUserIdService():Observable<number>{
		return this.userIdSubject.asObservable();
	}
}