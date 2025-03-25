"use client";

import { useEnsName } from "wagmi";

type Props = {
  address: string | undefined;
};

export function ENSName({ address }: Props) {
  const name = useEnsName({
    address: address ? (address as `0x${string}`) : wallet.address,
    chainId: 1,
  });

  if (name.data) return name.data;
  if (address) return address.slice(0, 6) + "..." + address.slice(-4);
  return "-";
}
