export default function Footer() {
  return (
    <footer className="container-app py-6 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <p className="text-sm font-normal">
          &copy; {new Date().getFullYear()} tentwenty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
