import Sidebar from "@/components/Sidebar";
import PageContents from "@/components/PageContents";

export default function uforbiddenPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[220px] p-8 overflow-y-auto max-w-[1400px]">
        <PageContents section="forbidden" />
      </main>
    </div>
  );
}
