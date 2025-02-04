import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeysPipe } from '../../home/pipes/keys.pipe'; // Adjust the path as needed

@Component({
  selector: 'app-work-out-type-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, KeysPipe],
  templateUrl: './work-out-type-dropdown.component.html',
  styleUrls: ['./work-out-type-dropdown.component.css']
})
export class WorkoutTypeDropdownComponent {
  // Define workoutTypes with an index signature so any string key returns a string array.
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

  @Output() workoutTypeSelected = new EventEmitter<{ workoutType: string; subWorkoutType: string }>();

  onWorkoutTypeChange() {
    // Reset sub-workout type when the workout type changes.
    this.selectedSubWorkoutType = '';
  }

  onSubmit() {
    this.workoutTypeSelected.emit({
      workoutType: this.selectedWorkoutType,
      subWorkoutType: this.selectedSubWorkoutType
    });
  }
}
