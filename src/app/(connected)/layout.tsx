import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="space-y-6">
        <Header /> 
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
