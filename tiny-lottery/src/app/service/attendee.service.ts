import { Attendee } from './../model/attendee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(private http: HttpClient) { }

  public getAttendees(): Observable<Array<Attendee>> {
    return this.http.get<any>('./assets/attendees.json')
      .pipe(map(data => {
        const attendees = new Array<Attendee>();
        data.responses[0].value.forEach(element => {
          const attendee = new Attendee();
          attendee.id = element.member.id;
          attendee.name = element.member.name;
          if (element.member.photo) {
            attendee.photo = element.member.photo.photo_link;
          } else {
            attendee.photo = '';
          }
          attendees.push(attendee);
        });
        return attendees;
      }));
  }
}
