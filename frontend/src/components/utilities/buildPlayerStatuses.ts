import isPlainObject from "./isPlainObject";

export interface buildPlayerStatusProps {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface playerStatusStandardised {
  id: number;
  value: number;
  label: string;
}

export function buildPlayerStatuses(
  playerStatusObject: buildPlayerStatusProps
): playerStatusStandardised[] | undefined {
  if (isPlainObject(playerStatusObject)) {
    const finalStatuses = Object.entries(playerStatusObject)
      .map(([key, value]) => {
        switch (key) {
          case "yet":
            return { id: 1, value: Number(value), label: "May Play" };
          case "toplay":
            return { id: 2, value: Number(value), label: "Wishlisted" };
          case "owned":
            return { id: 3, value: Number(value), label: "Own" };
          case "playing":
            return { id: 4, value: Number(value), label: "Playing" };
          case "beaten":
            return { id: 5, value: Number(value), label: "Beaten" };
          case "dropped":
            return { id: 6, value: Number(value), label: "Dropped" };
          default:
            return undefined;
        }
      })
      .filter((item): item is playerStatusStandardised => item !== undefined);
    return finalStatuses;
  } else {
    return undefined;
  }
}
