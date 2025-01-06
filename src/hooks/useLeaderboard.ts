import liteflow from "@/lib/liteflow";
import { useQuery } from "@tanstack/react-query";

export const leaderboardQueryKey = () => ["leaderboard"];

export default function useLeaderboard() {
  return useQuery({
    queryFn: async () => {
      const res = await liteflow.leaderboard.list();
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    queryKey: leaderboardQueryKey(),
  });
}
