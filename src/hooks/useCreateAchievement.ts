import { leaderboardQueryKey } from "@/hooks/useLeaderboard";
import { leaderboardPositionQueryKey } from "@/hooks/useLeaderboardPosition";
import { default as liteflow } from "@/lib/liteflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateAchievement() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      address,
      questId,
    }: {
      address: string;
      questId: string;
    }) => {
      const res = await liteflow.achievements.create({
        questId,
        userAddress: address,
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data.redirect) {
        router.push(res.data.redirect);
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: leaderboardQueryKey() }),
        queryClient.invalidateQueries({ queryKey: ["quests"] }),
        queryClient.invalidateQueries({
          queryKey: leaderboardPositionQueryKey(address),
        }),
      ]);
    },
  });
}
