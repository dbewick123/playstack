interface buildPlayerRatingsProps {
  id: number;
  title: string;
  count: number;
  percent: number;
}

function sortRatingsOrder(
  actualRatings: buildPlayerRatingsProps[]
): buildPlayerRatingsProps[] {
  const targetOrder = [5, 4, 3, 1];
  let orderedRatings: buildPlayerRatingsProps[] = [];

  if (!actualRatings) {
    return orderedRatings;
  } else {
    targetOrder.forEach((num) => {
      const tempRating = actualRatings.find((rating) => rating.id === num);
      if (!tempRating) {
        return;
      } else {
        orderedRatings = [...orderedRatings, tempRating];
      }
    });
    return orderedRatings;
  }
}

function capitalizeWords(str: string) {
  let outputStr = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  switch (outputStr) {
    case "Exceptional":
      outputStr = "Amazing";
      break;
    case "Recommended":
      outputStr = "Good";
      break;
    case "Meh":
      outputStr = "Okay";
      break;
    case "Skip":
      outputStr = "Bad";
      break;
    default:
      break;
  }
  return outputStr;
}

export default function buildPlayerRatings(
  playerRatings: buildPlayerRatingsProps[]
) {
  const data = !Array.isArray(playerRatings)
    ? null
    : sortRatingsOrder(
        playerRatings.map((rating) => {
          return {
            id: rating?.id ?? -1,
            title: !rating?.title ? "-1" : capitalizeWords(rating.title),
            count: rating?.count ?? -1,
            percent: rating.percent ?? -1,
          };
        })
      );
  return data;
}
