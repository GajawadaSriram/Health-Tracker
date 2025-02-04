import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  
@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  userName: string = '';
  minutes: number = 0;
  
  @Output() userDataSubmitted = new EventEmitter<{ userName: string, minutes: number }>();

  onSubmit() {
    this.userDataSubmitted.emit({
      userName: this.userName,
      minutes: this.minutes
    });
  }
}
