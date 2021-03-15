import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http
      .post<any>("user-login", body)
      .pipe(
        map(data => {
          if (data.success) {
            localStorage.setItem("userData", data)
          }
          return data
        })
      )
  }
}
