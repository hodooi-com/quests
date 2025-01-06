type Props = {
  quest: {
    point: { amount: number } | null;
    badge: { name: string } | null;
  };
};
export function Reward({ quest }: Props) {
  if (quest.badge) return <span>{quest.badge.name} badge</span>;
  if (quest.point) return <span>{quest.point.amount.toString()} points</span>;
  return null;
}
