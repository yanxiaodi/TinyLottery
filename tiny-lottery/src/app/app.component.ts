import { Attendee } from './model/attendee';
import { AttendeeService } from './service/attendee.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100px',
        width: '100px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: 1,
      })),
state('closed', style({
  height: '80px',
  width: '80px',
  opacity: 0.2,
})),
  transition('open => closed', [
    animate('500ms')
  ]),
  transition('closed => open', [
    animate('500ms')
  ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'tiny-lottery';
  attendees: Array<Attendee>;
  private timer;
  private isRunning: boolean;
  constructor(private attendeeService: AttendeeService) {
    this.isRunning = false;
  }

  ngOnInit() {
    this.attendeeService.getAttendees().subscribe(attendees => this.attendees = attendees);
  }

  startLottery() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timer = setInterval(() => this.setRandom(), 50);
    } else {
      clearInterval(this.timer);
      this.isRunning = false;
      this.attendees.forEach(element => {
        element.isSelected = false;
      });
      this.setRandom();
    }
  }

  setRandom() {
    const count = this.attendees.length;
    const target = Math.floor(Math.random() * (count - 1));
    this.attendees[target].isSelected = !this.attendees[target].isSelected;
  }

}
