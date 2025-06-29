import { useMemo } from "react";
import Card from "./Card"; // <-- TAMBAHKAN BARIS INI

export default function BookingCalendar() {
  const { days, emptyDays } = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth =
      (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      emptyDays: Array.from({ length: firstDayOfMonth }, (_, i) => i),
    };
  }, []);

  const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const todayDate = new Date().getDate();
  const bookedDates = [5, 12, 20]; // Simulated

  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">Kalender Booking</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {weekDays.map((day) => (
          <div key={day} className="font-semibold text-slate-600 p-2">
            {day}
          </div>
        ))}
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        {days.map((day) => {
          const isToday = day === todayDate;
          const isBooked = bookedDates.includes(day);
          const dayClass = `p-2 border border-slate-200 rounded-md flex items-center justify-center h-12 w-12 ${
            isToday
              ? "bg-brand-primary text-white font-bold"
              : isBooked
              ? "bg-brand-secondary text-brand-primary font-semibold"
              : "bg-white text-slate-700"
          }`;
          return (
            <div
              key={day}
              className={dayClass}
              title={isBooked ? "Ter-booking" : isToday ? "Hari Ini" : ""}
            >
              {day}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
