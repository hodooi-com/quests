import liteflow from "@/lib/liteflow";
import { useQuery } from "@tanstack/react-query";

export const leaderboardPositionQueryKey = (address: string | undefined) => [
  "leaderboardByAddress",
  { address },
];

export default function useLeaderboardPosition(address: string | undefined) {
  return useQuery({
    queryFn: async () => {
      if (!address) throw new Error("Address is required");
      const res = await liteflow.leaderboard.retrieve(address);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    queryKey: leaderboardPositionQueryKey(address),
    enabled: !!address,
  });
}
