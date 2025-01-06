import liteflow from "@/lib/liteflow";
import { useQuery } from "@tanstack/react-query";

export const questsQueryKey = (address: string | undefined) => [
  "quests",
  { address },
];

export default function useQuests(address: string | undefined) {
  return useQuery({
    queryFn: async () => {
      const res = await liteflow.quests.list({ address });
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    queryKey: questsQueryKey(address),
  });
}
