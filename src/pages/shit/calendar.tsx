import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = () => (
  <div className="myCustomHeight">
    <Calendar localizer={localizer} startAccessor="start" endAccessor="end" />
  </div>
);

export function CalendarPage() {
  return <MyCalendar></MyCalendar>;
}
