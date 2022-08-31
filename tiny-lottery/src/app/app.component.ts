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
        border: 'solid 2px red'
      })),
      state('closed', style({
        height: '70px',
        width: '70px',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('500ms')
      ]),
      transition('closed => open', [
        animate('500ms')
      ]),
    ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ],
})
export class AppComponent implements OnInit {
  title = 'tiny-lottery';
  attendees: Array<Attendee>;
  timer: any;
  isRunning: boolean;
  buttonPlayText: string;
  luckyAttendees: Array<Attendee>;
  controlButtonVisible: boolean;
  confirmResultButtonsVisible: boolean;
  currentLuckyAttendee: Attendee;
  resultPanelVisible: boolean;
  luckyAttendeesCount: number;
  titleMessage: string;
  copyright: string;
  breakpoint: number;
  constructor(private attendeeService: AttendeeService) {
    this.isRunning = false;
    this.buttonPlayText = 'Start!';
    this.luckyAttendees = new Array<Attendee>();
    this.controlButtonVisible = true;
    this.confirmResultButtonsVisible = false;
    this.resultPanelVisible = false;
    this.luckyAttendeesCount = 0;
    this.titleMessage = 'CITANZ Meetup Lucky Draw';
    this.copyright = 'CITANZ 2022';
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 4 : 10;
    this.attendeeService.getAttendees().subscribe(attendees => this.attendees = attendees);
  }

  startLottery() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.buttonPlayText = 'Good Luck!';
      this.timer = setInterval(() => this.setRandom(), 50);
    } else {
      clearInterval(this.timer);
      this.isRunning = false;
      this.attendees.forEach(element => {
        element.isSelected = false;
      });
      this.buttonPlayText = 'Start!';
      this.controlButtonVisible = false;
      this.confirmResultButtonsVisible = true;
      this.currentLuckyAttendee = this.setRandom();
    }
  }

  setRandom(): Attendee {
    const count = this.attendees.length;
    const target = Math.floor(Math.random() * count);
    this.attendees[target].isSelected = !this.attendees[target].isSelected;
    return this.attendees[target];
  }

  confirmResultYes() {
    this.attendees.splice(this.attendees.indexOf(this.currentLuckyAttendee), 1);
    this.luckyAttendees.push(this.currentLuckyAttendee);
    this.controlButtonVisible = true;
    this.confirmResultButtonsVisible = false;
    this.luckyAttendeesCount = this.luckyAttendees.length;
    if (!this.resultPanelVisible) {
      this.resultPanelVisible = true;
    }
    this.titleMessage = 'Congratulations!';
  }

  confirmResultNo() {
    this.attendees.splice(this.attendees.indexOf(this.currentLuckyAttendee), 1);
    this.controlButtonVisible = true;
    this.confirmResultButtonsVisible = false;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 4 : 10;
  }
}
