import {useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import { ChromePicker } from 'react-color';
import { styled } from '@mui/material/styles';
import { 
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { fetchRobots } from './utilities/fetchRobots';
import { getRandomInt } from './utilities/randomInt';
import { 
  RobotFight,
  RobotsList,
  RobotView,
  BattleHistory
} from './components';
import './App.css';

export type RobotType = {
  name: string,
  color: string,
  attack: number,
  defense: number,
} | undefined;
export type RobotsType = RobotType[] | [];
export type FightRecordType = {
  fighterA: RobotType,
  fighterB: RobotType,
  endState: string,
};

const CreateButton = styled(Button)(({theme}) => ({
  background: theme.palette.secondary.dark,
}));

const BackButton = styled(Button)(({theme}) => ({
  background: theme.palette.primary.dark,
  marginTop: '10px'
}));

const HistoryButton = styled(Button)(({theme}) => ({
  background: theme.palette.primary.dark,
  alignSelf: 'center',
}));

const Details = styled(AccordionDetails)(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const AddIcon = styled(Add)(({theme}) => ({
  color: theme.palette.common.white,
}));

const Name = styled(TextField)(() => ({
  margin: '5px auto 15px'
}));

const Title = styled(Typography)(() => ({
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '10px'
}));

const Summary = styled(AccordionSummary)(({theme}) => ({
  background: theme.palette.grey[900],
  color: theme.palette.common.white,
  fontWeight: '500'
}));

export const App: React.FC = () => {
  const [view, setView] = useState('list');
  const [robots, setRobots] = useState<RobotsType>([]);
  const [pcRobot, setPcRobot] = useState<RobotType>();
  const [npcRobot, setNpcRobot] = useState<RobotType>();
  const [fightHistory, setFightHistory] = useState<FightRecordType[]>([]);
  const [color, setColor] = useState('#777');
  const [name, setName] = useState('');

  const handleSetRobots = (newRobots: RobotsType) => {
    setRobots(newRobots);
    localStorage.setItem("robots", JSON.stringify(newRobots));
  };

  useEffect(() => {
    const storedRobots = localStorage.getItem("robots");
    const storedHistory = localStorage.getItem("fightHistory");
    if (storedRobots) {
      handleSetRobots(JSON.parse(storedRobots));
    } else {
      fetchRobots().then((newRobots) => handleSetRobots(newRobots as RobotsType));
    }
    if (storedHistory) setFightHistory(JSON.parse(storedHistory));
  }, []);

  const createRobot = () => {
    const newRobot: RobotType = {
      color,
      name,
      attack: getRandomInt(5, 100),
      defense: getRandomInt(5, 100)
    }
    const newRobots = [...robots as RobotsType, newRobot];
    handleSetRobots(newRobots);
    setColor('');
    setName('');
    setView('robot');
    setPcRobot(newRobot);
  };

  const deleteRobot = (passedRobot: RobotType) => {
    const newRobots = robots.filter((checkRobot) => checkRobot !== passedRobot);
    handleSetRobots(newRobots);
    setView('list');
  };

  const startFight = () => {
    const combatantRobots = robots.filter(checkRobot => checkRobot !== pcRobot);
    const randomRobot = combatantRobots[getRandomInt(0, combatantRobots.length)];
    setNpcRobot(randomRobot);
    setView('fight');
  };

  const handleChangeColor = (color: {hex: string}) => {
    setColor(color.hex);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRobotClick = (clickedRobot: RobotType) => {
    setPcRobot(clickedRobot);
    setView('robot');
  };

  const handleBackClick = () => {
    setView('list');
  };

  const recordFight = (
    fighterA: RobotType, 
    fighterB: RobotType, 
    endState: string
  ) => {
    const newRecord = {
      fighterA,
      fighterB,
      endState,
    };
    const newFightHistory = [...fightHistory, newRecord];
    setFightHistory(newFightHistory);
    localStorage.setItem("fightHistory", JSON.stringify(newFightHistory));
    setView('list');
  };

  const NavGrid = ({children}: {children: ReactNode}) => {
    return (
      <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <BackButton 
          variant='contained' 
          onClick={handleBackClick} 
          aria-label='Go back'
        >
          <ArrowBack />
        </BackButton>
      </Grid>
    </Grid>
    )
  };

  return (
    <Box component='div' className='App'>
      <Box component='header'>
        <Title variant='h1'>
          Robot Battle Arena
        </Title>
      </Box>
      <Box component='main'>
        {
          // Chose not to integrate browser navigation to give more of a game feeling
          view === 'robot' && (
            <NavGrid>
                <RobotView 
                  robot={pcRobot}
                  deleteRobot={deleteRobot}
                  startFight={startFight}
                />
            </NavGrid>
          )
        }
        {
          view === 'fight' && (
            <RobotFight
              pcRobot={pcRobot}
              npcRobot={npcRobot}
              recordFight={recordFight}
            />
          )
        }
        {
          view === 'history' && (
            <NavGrid>
              <BattleHistory fightHistory={fightHistory} />
            </NavGrid>
          )
        }
        {
          view === 'list' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RobotsList robots={robots} handleRobotClick={handleRobotClick} />
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <Summary
                    expandIcon={<AddIcon />}
                    aria-controls='panel-content'
                    id='panel-header'
                  >
                    Create New Robot
                  </Summary>
                  <Box>
                    <Details>
                      <Name 
                        label='Name'
                        variant='outlined'
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                      />
                      <ChromePicker 
                        color={color} 
                        onChangeComplete={handleChangeColor}
                      />
                    </Details>
                    <AccordionActions>
                      <CreateButton variant='contained' onClick={createRobot}>Create</CreateButton>
                    </AccordionActions>
                  </Box>
                </Accordion>
              </Grid>
              <Grid container item xs={12} sx={{justifyContent: 'center'}}>
                <HistoryButton onClick={() => setView('history')} variant='contained'>
                  View Battle History
                </HistoryButton>
              </Grid>
            </Grid>
          )
        }
      </Box>
    </Box>
  );
};
