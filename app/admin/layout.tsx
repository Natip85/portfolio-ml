import MarginWidthWrapper from "@/components/MarginWidthWrapper";
import PageWrapper from "@/components/PageWrapper";
import AdminNavbarMobile from "@/components/nav/AdminNavbarMobile";
import AdminSidebar from "@/components/nav/AdminSidebar";
import AdminTopbar from "@/components/nav/AdminTopbar";

export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1">
        <MarginWidthWrapper>
          <AdminTopbar />
          <AdminNavbarMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
