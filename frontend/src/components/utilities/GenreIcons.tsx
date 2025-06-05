import { SvgIconProps } from "@mui/material";
import ActionIcon from "@mui/icons-material/Attractions";
import IndieIcon from "@mui/icons-material/Brush";
import AdventureIcon from "@mui/icons-material/Park";
import RpgIcon from "@mui/icons-material/Hiking";
import StrategyIcon from "@mui/icons-material/Hive";
import ShooterIcon from "@mui/icons-material/ModeStandby";
import CasualIcon from "@mui/icons-material/BeachAccess";
import SimulationIcon from "@mui/icons-material/Handyman";
import PuzzleIcon from "@mui/icons-material/Extension";
import ArcadeIcon from "@mui/icons-material/Grid4x4";
import PlatformerIcon from "@mui/icons-material/SettingsAccessibility";
import MmoIcon from "@mui/icons-material/Diversity2";
import RacingIcon from "@mui/icons-material/SportsMotorsports";
import SportsIcon from "@mui/icons-material/SportsFootball";
import FightingIcon from "@mui/icons-material/SportsMma";
import FamilyIcon from "@mui/icons-material/Groups2";
import BoardGamesIcon from "@mui/icons-material/Casino";
import CardIcon from "@mui/icons-material/Style";
import EducationalIcon from "@mui/icons-material/ImportContacts";

type GenreInfo = {
  id: number,
  name: string;
  icon: React.ReactElement<SvgIconProps>;
};

const genreIconMap: { [id: number]: GenreInfo } = {
  4: {
    id: 4,
    name: "Action",
    icon: <ActionIcon />,
  },
  51: {
    id: 51,
    name: "Indie",
    icon: <IndieIcon />,
  },
  3: {
    id: 3,
    name: "Adventure",
    icon: <AdventureIcon />,
  },
  5: {
    id: 5,
    name: "RPG",
    icon: <RpgIcon />,
  },
  10: {
    id: 10,
    name: "Strategy",
    icon: <StrategyIcon />,
  },
  2: {
    id: 2,
    name: "Shooter",
    icon: <ShooterIcon />,
  },
  40: {
    id: 40,
    name: "Casual",
    icon: <CasualIcon />,
  },
  14: {
    id: 14,
    name: "Simulation",
    icon: <SimulationIcon />,
  },
  7: {
    id: 7,
    name: "Puzzle",
    icon: <PuzzleIcon />,
  },
  11: {
    id: 11,
    name: "Arcade",
    icon: <ArcadeIcon />,
  },
  83: {
    id: 83,
    name: "Platformer",
    icon: <PlatformerIcon />,
  },
  59: {
    id: 59,
    name: "MMO",
    icon: <MmoIcon />,
  },
  1: {
    id: 1,
    name: "Racing",
    icon: <RacingIcon />,
  },
  15: {
    id: 15,
    name: "Sports",
    icon: <SportsIcon />,
  },
  6: {
    id: 6,
    name: "Fighting",
    icon: <FightingIcon />,
  },
  19: {
    id: 19,
    name: "Family",
    icon: <FamilyIcon />,
  },
  28: {
    id: 28,
    name: "Board Games",
    icon: <BoardGamesIcon />,
  },
  17: {
    id: 17,
    name: "Card",
    icon: <CardIcon />,
  },
  34: {
    id: 34,
    name: "Educational",
    icon: <EducationalIcon />,
  },
};

export default genreIconMap;
