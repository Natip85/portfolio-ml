import Navbar from "@/components/nav/Navbar";
import NavbarMobile from "@/components/nav/NavbarMobile";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <NavbarMobile />
      {children}
    </div>
  );
}
