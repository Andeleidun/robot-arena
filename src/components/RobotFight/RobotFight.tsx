import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    Typography,
  } from '@mui/material';
import { Robot } from '..';
import { getRandomInt } from '../../utilities/randomInt';
import type { RobotType } from '../../App';

const Fight = styled(Typography)(() => ({
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '10px',
    textAlign: 'center',
}));

const Info = styled(Typography)(() => ({
    fontSize: '20px',
    marginBottom: '10px'
}));

const FightButton = styled(Button)(({theme}) => ({
    background: `${theme.palette.secondary.dark}`
}));

const rightStyle = {
    justifyContent: 'flex-end',
};

export type RobotFightProps = {
    pcRobot: RobotType,
    npcRobot: RobotType,
    recordFight: (
        pcRobot: RobotType, 
        npcRobot: RobotType, 
        endGameState: string
    ) => void,
};

export function RobotFight({pcRobot, npcRobot, recordFight}: RobotFightProps) {
    const [pcHealth, setPcHealth] = useState(100);
    const [npcHealth, setNpcHealth] = useState(100);
    const [endGameState, setEndGameState] = useState<string | boolean>(false);
    const [inTurn, setInTurn] = useState(false);

    if (!pcRobot || !npcRobot) return undefined;

    const checkEndConditions = () => {
        if (pcHealth <= 0 && npcHealth <= 0) {
            return 'Draw';
        }
        if (pcHealth <= 0) {
            return 'Loss';
        }
        if (npcHealth <= 0) {
            return 'Victory';
        }
    };

    const handleAttack = () => {
        setInTurn(true);
        const {attack: pcAttack, defense: pcDefense} = pcRobot;
        const {attack: npcAttack, defense: npcDefense} = npcRobot;
        const pcLuck = getRandomInt(9, 14) / 10;
        const npcLuck = getRandomInt(9, 14) / 10;
        const calculatedAttack1 = Math.ceil(pcAttack * pcLuck / (1 + (npcDefense / 100)));
        const calculatedAttack2 = Math.ceil(npcAttack * npcLuck / (1 + (pcDefense / 100)));
        const pcBox = document.getElementById(`${pcRobot.name}pc`)?.getBoundingClientRect();
        const npcBox = document.getElementById(`${npcRobot.name}npc`)?.getBoundingClientRect();
        const projectile1 = document.createElement("div");
        projectile1.setAttribute('id', 'projectile1');
        projectile1.setAttribute("style", `
            padding: ${Math.max(Math.ceil(pcAttack / 5), 2)}px;
            background: ${pcRobot.color};
            position: absolute;
            left: ${pcBox?.right}px;
            top: ${pcBox?.top}px;
        `);
        const projectile2 = document.createElement("div");
        projectile2.setAttribute("style", `
            padding: ${Math.max(Math.ceil(npcAttack / 5), 2)}px;
            background: ${npcRobot.color};
            position: absolute;
            left: ${npcBox?.left}px;
            top: ${npcBox?.top}px;
        `);
        const projectile1Translate = [
            { transform: `translate3d(75vw, 0, 0)` },
        ];
        const projectileTiming = {
            duration: 1000,
            iterations: 1,
        };
        const projectile2Translate = [
            { transform: `translate3d(-75vw, 0, 0)` },
        ];
        document.body.appendChild(projectile1);
        document.body.appendChild(projectile2);
        projectile1.animate && 
            projectile1.animate(projectile1Translate, projectileTiming);
        projectile2.animate && 
            projectile2.animate(projectile2Translate, projectileTiming);
        setTimeout(() => {
            setPcHealth(pcHealth - calculatedAttack2);
            setNpcHealth(npcHealth - calculatedAttack1);
            document.body.removeChild(projectile1);
            document.body.removeChild(projectile2);
            setInTurn(false);
        }, 1000);
    };

    const endFight = () => {
        setEndGameState(false);
        recordFight(pcRobot, npcRobot, endGameState as string);
    };

    if (!endGameState) {
        const endValue = checkEndConditions();
        if (endValue) setEndGameState(endValue);
    }

    return (
        <Box>
            <Fight variant='h2'>Fight!</Fight>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Info variant='h3'>{pcRobot.name}</Info>
                </Grid>
                <Grid 
                    container 
                    item xs={6} 
                    style={rightStyle}
                >
                    <Info variant='h3'>{npcRobot.name}</Info>
                </Grid>
                <Grid item xs={6}>
                    <Info>Health: {pcHealth}</Info>
                </Grid>
                <Grid 
                    container 
                    item xs={6} 
                    style={rightStyle}
                >
                    <Info>Health: {npcHealth}</Info>
                </Grid>
                <Grid item xs={6}>
                    <Robot robot={pcRobot} slot='pc' />
                </Grid>
                <Grid 
                    container 
                    item xs={6} 
                    style={rightStyle}
                >
                    <Robot robot={npcRobot} slot='npc' />
                </Grid>
                <Grid item xs={6}>
                    <FightButton 
                        variant='contained' 
                        onClick={handleAttack}
                        disabled={inTurn}
                    >Attack</FightButton>
                </Grid>
            </Grid>
            <Dialog
                open={!!endGameState}
                onClose={endFight}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">
                    {endGameState}!
                </DialogTitle>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <FightButton variant='contained' onClick={endFight}>Return</FightButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}