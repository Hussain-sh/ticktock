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
    <header className="bg-white shadow-sm">
      <div className="w-full max-w-full px-6 py-4 flex items-center gap-8">
        <a href="#" className="text-2xl font-semibold text-gray-900">
          ticktock
        </a>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-sm font-medium text-gray-900">Timesheets</h3>
        </div>

        {user && <UserMenu name={user.name} />}
      </div>
    </header>
  );
}
