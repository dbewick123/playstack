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


const genreIconMap: { [slug: string]: React.ReactElement<SvgIconProps> } = {
  action: <ActionIcon />,
  indie: <IndieIcon />,
  adventure: <AdventureIcon />,
  //TODO: Fix the tooltip (and aria-label) for these multi word slugs, the simple string manipulation below isnt working
  "role-playing-games-rpg": <RpgIcon />,
  strategy: <StrategyIcon />,
  shooter: <ShooterIcon />,
  casual: <CasualIcon />,
  simulation: <SimulationIcon />,
  puzzle: <PuzzleIcon />,
  arcade: <ArcadeIcon />,
  platformer: <PlatformerIcon />,
  "massively-multiplayer": <MmoIcon />,
  racing: <RacingIcon />,
  sports: <SportsIcon />,
  fighting: <FightingIcon />,
  family: <FamilyIcon />,
  "board-games": <BoardGamesIcon />,
  card: <CardIcon />,
  educational: <EducationalIcon />,
};

export default genreIconMap;