import React from "react";
import Tooltip from "@mui/material/Tooltip";

import genreIconMap from "./GenreIcons";
import PlaceholderGenreIcon from "@mui/icons-material/Clear";

interface GenreIconsProps {
  genres: string[];
}

const GetGenreIcons: React.FC<GenreIconsProps> = ({
  genres,
}: GenreIconsProps) => {
  const genreJSX = genres
    .sort()
    .map((slug, index) => {
      const slugNormalized = slug.toLowerCase();
      return (
        genreIconMap[slugNormalized] && (
          <Tooltip
            key={index}
            title={
              slugNormalized.charAt(0).toUpperCase() + slugNormalized.slice(1)
            }
          >
            {React.cloneElement(genreIconMap[slugNormalized], {
              "aria-label":
                slugNormalized.charAt(0).toUpperCase() +
                slugNormalized.slice(1),
            })}
          </Tooltip>
        )
      );
    })
    .filter(Boolean);
  return <>{genreJSX.length > 0 ? genreJSX : <PlaceholderGenreIcon />}</>;
};

export default GetGenreIcons;
