"use client";

import Image from "next/image";
import { useAccount, useEnsAvatar } from "wagmi";

export function WalletAvatar() {
  const wallet = useAccount();
  const avatar = useEnsAvatar(wallet);

  return (
    <Image
      src={avatar.data || "/avatar.svg"}
      alt=""
      width={64}
      height={64}
      className="h-16 w-16 rounded-full"
    />
  );
}
