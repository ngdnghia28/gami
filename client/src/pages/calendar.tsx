import LunarCalendar from "@/components/lunar-calendar";
import DateConverter from "@/components/date-converter";

export default function Calendar() {
  return (
    <main className="min-h-screen">
      <LunarCalendar />
      <DateConverter />
    </main>
  );
}
