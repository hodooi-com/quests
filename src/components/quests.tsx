import { QuestButton } from "@/components/quest-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useQuests from "@/hooks/useQuests";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export default function Quests() {
  const account = useAccount();
  const searchParams = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get("page")) || 1,
    [searchParams]
  );
  const quests = useQuests(account.address, page);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quests</CardTitle>
        <CardDescription>
          Complete various quests profile to earn points!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul role="list" className="divide-y divide-muted">
          {quests.isLoading && (
            <li>
              <div className="flex items-center justify-center p-4 text-muted-foreground">
                Loading...
              </div>
            </li>
          )}
          {quests.isError && (
            <li>
              <div className="flex items-center justify-center p-4 text-destructive">
                Error loading quests {quests.error.message}
              </div>
            </li>
          )}

          {quests.data?.data.map((quest) => (
            <li key={quest.id}>
              <div className="flex flex-col justify-between gap-4 p-4 md:flex-row md:items-center">
                <div>
                  <div>{quest.title}</div>
                  {quest.description && (
                    <div className="text-sm text-muted-foreground/75">
                      {quest.description}
                    </div>
                  )}
                </div>
                <QuestButton quest={quest} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      {quests.data && quests.data.pagination.pageCount > 0 && (
        <CardFooter className="flex w-full justify-between gap-4">
          {quests.data.pagination.previousPage ? (
            <Button variant="ghost" disabled={quests.isPending} asChild>
              <Link
                href={`?page=${quests.data.pagination.previousPage.toString()}`}
              >
                <ChevronLeftIcon />
                Previous
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {quests.data.pagination.nextPage ? (
            <Button variant="ghost" disabled={quests.isPending} asChild>
              <Link
                href={`?page=${quests.data.pagination.nextPage.toString()}`}
              >
                Next <ChevronRightIcon />
              </Link>
            </Button>
          ) : (
            <span />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
