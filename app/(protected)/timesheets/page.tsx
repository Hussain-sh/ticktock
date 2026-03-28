export default function TimesheetsPage() {
  const timesheets = [
    { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
    { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
    { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
    { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
    { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
  ];
  return (
    <section className="container mx-auto bg-white text-gray-900 p-6 max-w-full md:max-w-2xl lg:max-w-7xl xl:max-w-[1400px] h-full">
      <h1 className="text-2xl font-bold mb-4 leading-none">Your Timesheets</h1>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Week #
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((row) => (
              <tr
                key={row.week}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 text-gray-800 font-medium">
                  {row.week}
                </td>
                <td className="px-5 py-4 text-gray-700">{row.date}</td>
                <td className="px-5 py-4">{row.status}</td>
                <td className="px-5 py-4 text-right">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
