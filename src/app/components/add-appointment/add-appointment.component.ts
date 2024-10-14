import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css',
})
export class AddAppointmentComponent {
  constructor(public dialog: MatDialog) {}

  onAddAppointmentClick(): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      maxWidth: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
