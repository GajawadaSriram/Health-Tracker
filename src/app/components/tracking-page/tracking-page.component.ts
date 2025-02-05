import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { UserDataService } from '../../services/user-data.service';

interface UserData {
  name: string;
  workoutType: string;
  subWorkoutType: string;
  workoutCount: number;
  minutes: number;
}

@Component({
  selector: 'app-tracking-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css']
})
export class TrackingPageComponent implements OnInit {
  users: UserData[] = []; 
  filteredUsers: UserData[] = []; 
  searchQuery = '';
  selectedWorkoutType: string = '';
  selectedSubWorkoutType: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  progress = 0;
  isLoading = false;
  workoutChart: any;

  workoutTypes: { [key: string]: string[] } = {
    'Cardio': ['Running', 'Cycling', 'Swimming', 'Jumping Rope', 'Rowing', 'HIIT'],
    'Strength Training': ['Weightlifting', 'Push-ups', 'Squats', 'Bodyweight Exercises'],
    'Flexibility & Mobility': ['Yoga', 'Stretching', 'Pilates'],
    'Balance & Stability': ['Tai Chi', 'BOSU Ball Exercises'],
    'Endurance Training': ['Long-distance Running', 'Circuit Training'],
    'Functional Training': ['Kettlebell Workouts', 'CrossFit'],
    'Rehabilitation & Recovery': ['Physiotherapy', 'Foam Rolling'],
  };

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    // Fetch user data from the service
    this.users = this.userDataService.getUsers();

    // Store default users directly in the users array
    this.users = [
      { name: 'John Doe', workoutType: 'Cardio', subWorkoutType: 'Running', workoutCount: 10, minutes: 120 },
      { name: 'Jane Smith', workoutType: 'Strength Training', subWorkoutType: 'Weightlifting', workoutCount: 15, minutes: 150 },
      { name: 'Sam Lee', workoutType: 'Endurance Training', subWorkoutType: 'Long-distance Running', workoutCount: 20, minutes: 180 },
      ...this.users, // Append fetched users to the default users
    ];

    // Set the filtered users initially to the full list of users (including default)
    this.filteredUsers = [...this.users];
    console.log(this.users); // Check the fetched or default users
  }

  filterUsers() {
    this.isLoading = true;
    this.progress = 0;

    // Simulate progress bar animation
    const interval = setInterval(() => {
      this.progress = Math.min(this.progress + (100 / 20), 100); // 20 steps
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.filteredUsers = this.getFilteredUsers();
          this.createWorkoutChart(this.filteredUsers);
          this.isLoading = false;
        }, 300); // Match transition duration
      }
    }, 50);
  }

  getFilteredUsers() {
    return this.users.filter(user => {
      return (this.selectedWorkoutType ? user.workoutType === this.selectedWorkoutType : true)
        && (this.selectedSubWorkoutType ? user.subWorkoutType === this.selectedSubWorkoutType : true)
        && (this.searchQuery ? user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true);
    });
  }

  createWorkoutChart(filteredUsers: UserData[]) {
    if (this.workoutChart) {
      this.workoutChart.destroy();
    }

    const labels = filteredUsers.map(user => user.name);
    const workoutData = filteredUsers.map(user => user.workoutCount);
    const minutesData = filteredUsers.map(user => user.minutes);

    this.workoutChart = new Chart('workoutChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Workout Sessions',
          data: workoutData,
          backgroundColor: 'rgba(79, 70, 229, 0.8)',
          borderRadius: 12,
          borderWidth: 0
        }, {
          label: 'Total Minutes',
          data: minutesData,
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderRadius: 12,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
            ticks: { color: '#6b7280' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#6b7280' }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#374151',
              font: {
                weight: 600 // Use number or valid string
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  getPaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
}
