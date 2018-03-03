import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AddService {

  getEmployeesURL = 'http://demo5747116.mockable.io/employee/add';
  employeeDetails = [];
  constructor(
    private http: HttpClient
  ) { }

  static handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('Error Log from handleError', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log('Console Log from handleError', `${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.getEmployeesURL)
      .pipe(
        // tap(_ => console.log('Employee List Fetched', _)),
        catchError(AddService.handleError())
      );
  }
}
