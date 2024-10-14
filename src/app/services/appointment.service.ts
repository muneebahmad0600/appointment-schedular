import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Appointment } from '../types/appointment';

export interface AppState {
  appointments: Appointment[];
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubjcet = new BehaviorSubject<Appointment[]>([]);
  private $appointments = this.appointmentsSubjcet.asObservable();

  private dateSubject = new BehaviorSubject<Date>(new Date());
  private $date = this.dateSubject.asObservable();

  $state: Observable<AppState> = combineLatest([
    this.$appointments,
    this.$date,
  ]).pipe(
    map(([appointments, date]) => ({
      appointments: appointments.filter((appointment: Appointment) => {
        const appointmentDate = this.normalizeDate(new Date(appointment.date));
        return (
          appointmentDate.getDate() === date.getDate() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getFullYear() === date.getFullYear()
        );
      }),
      date,
    }))
  );

  constructor() {
    const appointments = JSON.parse(
      localStorage.getItem('appointments') ?? '[]'
    ).map((appointment: Appointment) => ({
      ...appointment,
      date: this.normalizeDate(new Date(appointment.date)),
    }));
    this.appointmentsSubjcet.next(appointments);
  }

  public addAppointment(appointment: Appointment): void {
    const appointments =
      JSON.parse(localStorage.getItem('appointments') ?? '[]') || [];
    appointments.push({
      ...appointment,
      date: this.normalizeDate(new Date(appointment.date)),
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    this.appointmentsSubjcet.next(appointments);
  }

  public selectedDateChanged(date: Date): void {
    this.dateSubject.next(this.normalizeDate(date));
  }
  private normalizeDate(date: Date): Date {
    // Set the time to 00:00:00 to avoid time zone issues
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
  }

  public rescheduleAppointment(
    appointment: Appointment,
    newTime: string
  ): void {
    const appointments = JSON.parse(
      localStorage.getItem('appointments') ?? '[]'
    ).map((a: Appointment) => {
      if (a.id === appointment.id) {
        return { ...a, time: newTime };
      }
      return a;
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    this.appointmentsSubjcet.next(appointments);
  }

  public deleteAppointment(appointment: Appointment): void {
    const appointments = JSON.parse(
      localStorage.getItem('appointments') ?? '[]'
    ).filter((a: Appointment) => a.id !== appointment.id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    this.appointmentsSubjcet.next(appointments);
  }
}
