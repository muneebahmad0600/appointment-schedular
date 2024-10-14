import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { AddAppointmentComponent } from '../../components/add-appointment/add-appointment.component';
import { VerticalTimelineComponent } from '../../components/vertical-timeline/vertical-timeline.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    AddAppointmentComponent,
    VerticalTimelineComponent,
    CalendarComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css',
})
export class AppointmentPageComponent {}
