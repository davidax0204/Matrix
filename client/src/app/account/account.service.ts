import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './models/user';
import { tap } from 'rxjs/operators';
import { UserCredentials } from './models/userCredentials';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountApiAdress: string = environment.apiUrl + 'account/';
  private _currentUser = new BehaviorSubject<User>(null);
  currentUser = this._currentUser.asObservable();

  constructor(private http: HttpClient) {}

  login(loginModel: UserCredentials) {
    return this.http
      .post<User>(this.accountApiAdress + 'login', loginModel)
      .pipe(
        tap((user) => {
          this.setCurrentUser(user);
        })
      );
  }

  register(registerModel: UserCredentials) {
    return this.http
      .post<User>(this.accountApiAdress + 'register', registerModel)
      .pipe(
        tap((user) => {
          this.setCurrentUser(user);
        })
      );
  }

  setCurrentUser(user?: User) {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      this._currentUser.next(user);
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('pagination');
      this._currentUser.next(null);
    }
  }

  autoLogin() {
    const user: User = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.setCurrentUser(user);
    }
  }
}
