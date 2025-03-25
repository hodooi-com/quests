import liteflow from "@/lib/liteflow";
import { useQuery } from "@tanstack/react-query";

export const questsQueryKey = (address: string | undefined, page: number) => [
  "quests",
  { address, page },
];

export default function useQuests(
  address: string | undefined,
  page: number = 1
) {
  return useQuery({
    queryFn: async () => {
      const res = await liteflow.quests.list({ address, page });
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    queryKey: questsQueryKey(address, page),
  });
}
