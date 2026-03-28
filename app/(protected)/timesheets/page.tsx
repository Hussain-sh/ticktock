import Footer from "@/app/components/Footer";
import TimesheetTable from "@/app/components/TimesheetTable";

export default function TimesheetsPage() {
  return (
    <section className="container-app px-4 lg:px-0 flex flex-col gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4 leading-none">
          Your Timesheets
        </h1>
        <TimesheetTable />
      </div>
      <Footer />
    </section>
  );
}
