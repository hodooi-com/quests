import { ENSName } from "@/components/ens-name";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useLeaderboard from "@/hooks/useLeaderboard";

export default function Leaderboard() {
  const leaderboard = useLeaderboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See who&apos;s leading the pack!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.isLoading && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {leaderboard.isError && (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-destructive">
                  Error loading leaderboard
                </TableCell>
              </TableRow>
            )}
            {leaderboard.data?.map(({ address, points }) => (
              <TableRow key={address}>
                <TableCell>
                  <ENSName address={address} />
                </TableCell>
                <TableCell className="text-right">
                  {points.toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
