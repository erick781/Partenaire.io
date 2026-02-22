import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BottomNav from "@/components/ai-cfo/BottomNav";
import CFOHeader from "@/components/ai-cfo/CFOHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI CFO — Growth Partner Command Center",
};

export default async function AICFOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Only admin can access AI CFO
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/meta-ads");
  }

  return (
    <div className="min-h-screen bg-cfo-base font-cfo">
      <CFOHeader />
      <main className="max-w-[430px] mx-auto px-4 pb-24 pt-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
