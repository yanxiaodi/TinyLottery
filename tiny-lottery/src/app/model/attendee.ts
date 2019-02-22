export class Attendee {
  id: number;
  name: string;
  photo: string;
  isSelected: boolean;
  constructor() {
    this.isSelected = false;
  }
}
