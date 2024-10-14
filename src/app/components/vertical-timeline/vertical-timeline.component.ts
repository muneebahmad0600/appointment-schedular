import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, AppointmentsByHour } from '../../types/appointment';

@Component({
  selector: 'app-vertical-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CdkDrag,
    CdkDropList,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './vertical-timeline.component.html',
  styleUrl: './vertical-timeline.component.css',
})
export class VerticalTimelineComponent {
  hours = [
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

  $state = this.appointmentService.$state;

  appointments: Observable<AppointmentsByHour> = this.$state.pipe(
    distinctUntilChanged(
      (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
    ),
    map((state) => {
      const appointmentByHour: AppointmentsByHour = {};

      // Initialize each hour with an empty array
      this.hours.forEach((hour: string) => {
        appointmentByHour[hour] = [];
      });

      // Populate the appointmentByHour object
      state.appointments.forEach((appointment: Appointment) => {
        const hour = appointment.time;
        if (appointmentByHour[hour]) {
          appointmentByHour[hour].push(appointment);
        }
      });

      return appointmentByHour;
    })
  );

  constructor(private appointmentService: AppointmentService) {}

  drop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.appointmentService.rescheduleAppointment(
        event.container.data[event.previousIndex],
        event.container.id
      );
    }
  }

  connectedDropListsIds(currentHour: string): string[] {
    return this.hours.filter((hour) => hour !== currentHour);
  }

  deleteAppointment(appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment);
  }
}

// jobs@getpayever.com
// support@payever.de