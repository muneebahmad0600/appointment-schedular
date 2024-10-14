import { Component, effect, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  selected = model<Date | null>(new Date());

  constructor(private appointmentService: AppointmentService) {
    effect(() => {
      const selectedDate = this.selected();
      if (selectedDate) {
        appointmentService.selectedDateChanged(selectedDate);
      }
    });
  }
}
