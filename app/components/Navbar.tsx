import { getUser } from "../lib/auth";
import UserMenu from "./UserMenu";

interface User {
  id: number;
  email: string;
  name: string;
}

export default async function Navbar() {
  const user = (await getUser()) as User | null;
  return (
    <header className="flex justify-between p-4 bg-white shadow-sm">
      <div className="flex gap-8 items-center">
        <a href="#" className="text-2xl font-semibold text-gray-900">
          ticktock
        </a>
        <h3 className="text-sm font-medium text-gray-900">Timesheets</h3>
      </div>
      {user && <UserMenu name={user.name} />}
    </header>
  );
}
