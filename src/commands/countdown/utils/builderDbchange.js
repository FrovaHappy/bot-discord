export function buildersDbChange(countdownQuery) {
  const hasUpdated = countdownQuery.hasUpdated;
  const data = countdownQuery.data;
  const change = Object.keys(hasUpdated);
  let result = ``;
  for (const key of change) {
    if (hasUpdated[key]) result += `> :white_medium_small_square: ${key}: \`${data[key]}\` \n`;
    else result += `> :black_medium_small_square: ${key}: \`${data[key]}\` \n`;
  }
  return result;
}
