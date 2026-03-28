export default function Badge({
  children,
  bgColor,
  textColor,
}: {
  children: React.ReactNode;
  bgColor: string;
  textColor: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${bgColor} ${textColor}`}
    >
      {children}
    </span>
  );
}
