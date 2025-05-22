import React from "react";
import Tooltip from "@mui/material/Tooltip";
//TODO: Complete this functionality
import EsrbAdults from "../../assets/icons/esrb/esrb-adult.svg?react";
import EsrbEveryone from "../../assets/icons/esrb/esrb-everyone.svg?react";
import EsrbEveryone10 from "../../assets/icons/esrb/esrb-everyone10.svg?react";
import EsrbTeen from "../../assets/icons/esrb/esrb-teen.svg?react";
import EsrbMature from "../../assets/icons/esrb/esrb-mature.svg?react";
import EsrbPending from "../../assets/icons/esrb/esrb-pending.svg?react";

interface EsrbIconsProps {
  esrb: string;
}

const esrbIconMap: {
  [slug: string]: {
    icon: React.ReactElement;
    alt: string;
  };
  // TODO: Testing - consider how to know if the API changes the slugs, my test suite should pick this up
} = {
  "adults-only": {
    icon: <EsrbAdults />,
    alt: "Adults Only 18+",
  },
  everyone: {
    icon: <EsrbEveryone />,
    alt: "Everyone",
  },
  "everyone-10-plus": {
    icon: <EsrbEveryone10 />,
    alt: "Everyone 10+",
  },
  teen: {
    icon: <EsrbTeen />,
    alt: "Teen",
  },
  mature: {
    icon: <EsrbMature />,
    alt: "Mature 17+",
  },
  pending: {
    icon: <EsrbPending />,
    alt: "Rating Pending",
  },
};

const GetEsrbRating: React.FC<EsrbIconsProps> = ({ esrb }: EsrbIconsProps) => {
  const esrbJSX = esrb;

  const slugNormalized = esrb.toLowerCase();
  return (
    esrbIconMap[slugNormalized] && (
      <Tooltip title={esrbIconMap[slugNormalized].alt}>
        {esrbIconMap[slugNormalized].icon}
      </Tooltip>
    )
  );
  return <>{!esrbJSX ? <EsrbPending /> : esrbJSX}</>;
};

export default GetEsrbRating;
