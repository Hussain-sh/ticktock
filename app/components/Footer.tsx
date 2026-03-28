export default function Footer() {
  return (
    <footer className="container mx-auto bg-white text-gray-900 py-6 max-w-full md:max-w-2xl lg:max-w-7xl xl:max-w-[1400px]">
      <div className="text-center">
        <p className="text-sm font-normal">
          &copy; {new Date().getFullYear()} tentwenty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
