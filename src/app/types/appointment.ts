export type Appointment = {
  id: string;
  title: string;
  time: string;
  date: Date;
  description?: string;
};

export type AppointmentsByHour = {
  [key: string]: Appointment[];
};
