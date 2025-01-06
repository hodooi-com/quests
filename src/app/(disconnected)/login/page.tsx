"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Login() {
  const router = useRouter();
  const account = useAccount();

  // redirect to main page when account is connected
  useEffect(() => {
    if (account.status === "connected") router.replace("/");
  }, [account, router]);

  if (account.isReconnecting) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Connect your wallet to start earning points!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConnectButton chainStatus="none" showBalance={false} />
      </CardContent>
    </Card>
  );
}
