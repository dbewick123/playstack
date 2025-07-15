import React from "react";
import Tooltip from "@mui/material/Tooltip";

import genreIconMap from "./GenreIcons";
import PlaceholderGenreIcon from "@mui/icons-material/Clear";

interface GenreIconsProps {
  genres: number[];
}

const GetGenreIcons: React.FC<GenreIconsProps> = ({
  genres,
}: GenreIconsProps) => {
  if (genres?.length > 0) {
    const genreJSX = genres
      .map((id, index) => {
        const genre = genreIconMap[id];
        if (!genre) return null;

        const IconComponent = genre.icon;
        return (
          <Tooltip key={index} title={genre.name}>
            <IconComponent aria-label={genre.name} />
          </Tooltip>
        );
      })
      .filter(Boolean);
    return <>{genreJSX.length > 0 ? genreJSX : <PlaceholderGenreIcon />}</>;
  } else {
    return;
  }
};

export default GetGenreIcons;
