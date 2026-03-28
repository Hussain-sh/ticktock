import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-blue-600 flex items-center justify-center p-4 md:p-8 order-first md:order-last">
        <div className="flex flex-col justify-start items-start md:justify-start md:items-start text-white gap-4 mx-5 md:mx-20">
          <h2 className="text-2xl font-semibold md:text-4xl">ticktock</h2>
          <p className="text-sm font-normal text-gray-200 md:text-base">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 order-last md:order-first">
        <LoginForm />
      </div>
    </main>
  );
}
