import { styled } from '@mui/material/styles';
import { 
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
  } from '@mui/material';
import { 
    SmartToy, 
    PrecisionManufacturing
} from '@mui/icons-material';
import type { FightRecordType } from '../../App';

const Heading = styled(Typography)(() => ({
    fontSize: '20px',
    fontWeight: '500'
}));

const HistoryList = styled(List)(() => ({
    margin: '10px auto'
}));

const HistoryListItem = styled(ListItem)(() => ({
    margin: '5px auto'
}));

export type BattleHistoryProps = {
    fightHistory: FightRecordType[],
};

export function BattleHistory({fightHistory}: BattleHistoryProps) {
    return (
        <>
            <Grid container spacing={1}>
                <Grid container item xs={4}>
                    <Heading variant='h2'>Player</Heading>
                </Grid>
                <Grid container item xs={4} sx={{justifyContent: 'center'}}>
                    <Heading variant='h2'>Result</Heading>
                </Grid>
                <Grid container item xs={4} sx={{justifyContent: 'right'}}>
                    <Heading variant='h2'>Opponent</Heading>
                </Grid>
            </Grid>
            <HistoryList>
                {
                    fightHistory.map(({fighterA, fighterB, endState}, index) => fighterA && fighterB && (
                        <HistoryListItem key={index} disablePadding>
                            <Grid container spacing={0}>
                                <Grid container item xs={4}>
                                    <ListItemIcon>
                                        {
                                            fighterA.attack > fighterA.defense ? (
                                                <PrecisionManufacturing sx={{color: fighterA.color}} />
                                            ) : (
                                                <SmartToy sx={{color: fighterA.color}} />
                                            )
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={fighterA.name} />
                                </Grid>
                                <Grid container item xs={4}>
                                    <ListItemText sx={{textAlign: 'center'}} primary={endState} />
                                </Grid>
                                <Grid container item xs={4}>
                                    <ListItemText sx={{textAlign: 'right'}} primary={fighterB.name} />
                                    <ListItemIcon sx={{justifyContent: 'flex-end'}}>
                                        {
                                            fighterB.attack > fighterB.defense ? (
                                                <PrecisionManufacturing sx={{color: fighterB.color}} />
                                            ) : (
                                                <SmartToy sx={{color: fighterB.color}} />
                                            )
                                        }
                                    </ListItemIcon>
                                </Grid>
                            </Grid>
                        </HistoryListItem>
                    ))
                }
            </HistoryList>
          </>
    )
}