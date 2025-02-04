import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutTypeDropdownComponent } from './work-out-type-dropdown.component'; // Corrected the import to match the file name

describe('WorkoutTypeDropdownComponent', () => {
  let component: WorkoutTypeDropdownComponent;
  let fixture: ComponentFixture<WorkoutTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutTypeDropdownComponent]  // Added the correct declaration
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
