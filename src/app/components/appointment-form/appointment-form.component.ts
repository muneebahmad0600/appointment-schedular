import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM',
    '09:00 PM',
  ];
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentFormComponent>
  ) {
    this.appointmentForm = this.fb.group({
      id: [this.generateId, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.appointmentService.addAppointment(this.appointmentForm.value);
      this.dialogRef.close();
    } else {
      this.appointmentForm.markAllAsTouched();
    }
  }

  get generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
