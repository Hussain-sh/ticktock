export default function TimesheetDetailPage({
  params,
}: {
  params: { week: string };
}) {
  const { week } = params;

  return (
    <div>
      <h1>Timesheet - Week {week}</h1>
    </div>
  );
}
