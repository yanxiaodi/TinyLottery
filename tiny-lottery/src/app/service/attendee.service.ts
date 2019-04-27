import { Attendee } from './../model/attendee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(private http: HttpClient) { }

  public getAttendees(): Observable<Array<Attendee>> {
    return this.http.get<any>('./assets/attendees.json')
      .pipe(map(data => {
        const attendees = new Array<Attendee>();
        data.responses[0].value.filter(x => x.rsvp.response === 'yes').forEach(element => {
          const attendee = new Attendee();
          attendee.id = element.member.id;
          attendee.name = element.member.name;
          if (element.member.photo) {
            attendee.photo = element.member.photo.photo_link;
          } else {
            attendee.photo = '/assets/citanz-logo.png';
          }
          attendees.push(attendee);
        });
        return attendees;
      }), catchError(this.handleError<Array<Attendee>>('getAttendees', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
