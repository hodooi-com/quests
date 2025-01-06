"use client";

import { Reward } from "@/components/reward";
import { Button } from "@/components/ui/button";
import useCreateAchievement from "@/hooks/useCreateAchievement";
import { useCallback } from "react";
import { useAccount } from "wagmi";

type Props = {
  quest: {
    id: string;
    point: {
      amount: number;
    } | null;
    badge: { name: string } | null;
    claimed: boolean;
  };
};
export function QuestButton({ quest }: Props) {
  const account = useAccount();
  const createAchievement = useCreateAchievement();

  const submit = useCallback(() => {
    if (!account.address) return;
    createAchievement.mutate({
      address: account.address,
      questId: quest.id,
    });
  }, [account.address, createAchievement, quest.id]);

  if (quest.claimed) {
    return (
      <Button variant="ghost" disabled>
        <Reward quest={quest} />
      </Button>
    );
  }
  if (!account.address) return null;
  if (createAchievement.isPending) return <Button disabled>Claiming...</Button>;
  return (
    <Button onClick={submit}>
      <Reward quest={quest} />
    </Button>
  );
}
