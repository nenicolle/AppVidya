export function getInitials(name: string) {
  const parts = name.split(' ');
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`
    : `${parts[0][0]}${parts[0][1] || ''}`.toUpperCase();
}

export function getColorFromId(id: number) {
  const colors = ['#FF6B6B', '#4ECDC4', '#C86DD7', '#F7B731', '#45AAF2', '#9B59B6', '#26de81'];
  return colors[id % colors.length];
}
