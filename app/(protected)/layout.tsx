import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-6 min-h-screen bg-gray-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
