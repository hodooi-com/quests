"use client";

import Leaderboard from "@/components/leaderboard";
import Quests from "@/components/quests";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const account = useAccount();

  // redirect to main page when account is disconnected
  useEffect(() => {
    if (account.status === "disconnected") router.replace("/login");
  }, [account, router]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Quests />
      </div>
      <div>
        <Leaderboard />
      </div>
    </div>
  );
}
