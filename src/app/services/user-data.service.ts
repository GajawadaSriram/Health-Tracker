import { Injectable } from '@angular/core';
import { UserData } from '../models/user-data'; // Assuming this is where your interface is

@Injectable({
  providedIn: 'root' // Make sure this service is available globally
})
export class UserDataService {
  private users: UserData[] = []; // Store user data here

  constructor() {}

  // Add new user data
  addUser(user: UserData): void {
    this.users.push(user);
  }

  // Retrieve all user data
  getUsers(): UserData[] {
    return this.users;
  }
}
