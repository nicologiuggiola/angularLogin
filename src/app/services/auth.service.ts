import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private readonly API_URL = "https://6229de55be12fc4538aa6c8e.mockapi.io/users"

  constructor(private http: HttpClient) { }

  public user?: User;

  public isAuth = false;


  login(username: string, psw: string): Observable<User | undefined>{
    return this.http.get<User[]>(this.API_URL + "?username=" + username).pipe(
      map((users: User[]) => {
        // for (const user of users) {
        //   if (user.username === username && user.password === psw) {
        //     return user;
        //   }
        // }
        // return null;
        const user = users.find(u => u.username === username && u.password === psw);
        if (user) {
          this.user = user;
          this.isAuth = true;
        }
        return user;
      })
    )
  }

  checkIfExists(user: User): Observable<boolean> {
    return this.http.get<User[]>(this.API_URL + "?mail=" + user.mail).pipe(
      map((users:User[]) => users.filter((u) => u.username === user.username)),
      map((users: User[]) => {
        if(users.length < 1){
          return true;
        }else{
          return false;
        }
      })
    )
  }

  register(user: User): Observable<User>{
    return this.http.post<User>(this.API_URL, user)
  }

  isUserAuth(): Observable<boolean>{
    return of(true);
  }

  logOut() {
    this.isAuth = false;
    this.user = undefined;
  }



}
