"use client";

import Leaderboard from "@/components/leaderboard";
import { QuestButton } from "@/components/quest-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useQuests from "@/hooks/useQuests";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const account = useAccount();
  const quests = useQuests(account.address);

  // redirect to main page when account is disconnected
  useEffect(() => {
    if (account.status === "disconnected") router.replace("/login");
  }, [account, router]);

  if (account.isReconnecting) return null;

  return (
    <div className="grid grid-cols-3 gap-6">
      <Leaderboard />
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Quests</CardTitle>
          <CardDescription>
            Complete various quests profile to earn points!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul role="list" className="divide-y divide-muted">
            {quests.isLoading && (
              <li>
                <div className="flex items-center justify-center p-4 text-muted-foreground">
                  Loading...
                </div>
              </li>
            )}
            {quests.isError && (
              <li>
                <div className="flex items-center justify-center p-4 text-destructive">
                  Error loading quests {quests.error.message}
                </div>
              </li>
            )}

            {quests.data?.data?.map((quest) => (
              <li key={quest.id}>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div>{quest.title}</div>
                    {quest.description && (
                      <div className="text-sm text-muted-foreground/75">
                        {quest.description}
                      </div>
                    )}
                  </div>
                  <QuestButton quest={quest} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
