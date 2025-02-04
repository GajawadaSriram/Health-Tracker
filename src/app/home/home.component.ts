import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { KeysPipe } from './pipes/keys.pipe';
import { UserDataService } from '../services/user-data.service';
import { UserData } from '../models/user-data';  // Import UserData interface

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, KeysPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName: string = '';
  minutes: number = 0;

  workoutTypes: { [key: string]: string[] } = {
    'Cardio (Aerobic Exercise)': ['Running', 'Cycling', 'Swimming', 'Jumping Rope', 'Rowing', 'HIIT'],
    'Strength Training': ['Weightlifting', 'Push-ups', 'Squats', 'Resistance Bands'],
    'Flexibility & Mobility': ['Yoga', 'Stretching', 'Pilates'],
    'Balance & Stability': ['Tai Chi', 'BOSU Ball', 'Single-leg Movements'],
    'Endurance Training': ['Long-distance Running', 'Cycling', 'Circuit Training'],
    'Functional Training': ['Kettlebell Workouts', 'CrossFit', 'Agility Drills'],
    'Rehabilitation & Recovery': ['Physiotherapy', 'Foam Rolling', 'Low-impact Workouts']
  };

  selectedWorkoutType: string = '';
  selectedSubWorkoutType: string = '';

  constructor(private userDataService: UserDataService, private router: Router) {}

  onWorkoutTypeChange() {
    this.selectedSubWorkoutType = '';
  }

  onSubmit() {
    // Ensure all required fields are present
    if (!this.userName || !this.selectedWorkoutType || !this.selectedSubWorkoutType || this.minutes <= 0) {
      alert('Please fill all fields before submitting.');
      return;
    }

    // Create a user data object
    const userData: UserData = {
      name: this.userName,
      minutes: this.minutes,
      workoutType: this.selectedWorkoutType,
      subWorkoutType: this.selectedSubWorkoutType,
      workoutCount: 1 // Default value for new user
    };

    // Store the user data in the service
    this.userDataService.addUser(userData);

    console.log('User Data Stored:', userData);

    // Navigate to tracking page
    this.router.navigate(['/tracking']);
  }
}
