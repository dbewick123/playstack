import React from "react";
import Tooltip from "@mui/material/Tooltip";

import genreIconMap from "./GenreIcons";
import PlaceholderGenreIcon from "@mui/icons-material/Clear";

interface GenreIconsProps {
  genres: number[];
}

const GetGenreIcons: React.FC<GenreIconsProps> = ({genres}: GenreIconsProps) => {
  if(genres.length < 1) {
    return;
  } else {
  // TODO: Sort these alphabetically
    const genreJSX = genres
    .map((id, index) => {
      return (
        genreIconMap[id].icon && (
          <Tooltip
            key={index}
            title={
              genreIconMap[id].name
            }
          >
            {React.cloneElement(genreIconMap[id].icon, {
              "aria-label":
              genreIconMap[id].name
            })}
          </Tooltip>
        )
      );
    })
    .filter(Boolean);
  return <>{genreJSX.length > 0 ? genreJSX : <PlaceholderGenreIcon />}</>;
}};

export default GetGenreIcons;
