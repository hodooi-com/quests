"use client";
import useLeaderboardPosition from "@/hooks/useLeaderboardPosition";
import { useAccount } from "wagmi";

export function Header() {
  const { address } = useAccount();
  const user = useLeaderboardPosition(address);

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6"></div>
          <div className="flex items-center gap-x-6">
            <div className="font-semibold leading-6">Total points</div>
            <div className="text-2xl font-semibold leading-6">
              {user.isLoading
                ? "-"
                : user.isError
                  ? "0"
                  : user.data?.points.toString() || "0"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
