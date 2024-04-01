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
import type { RobotType } from '../../App';

const Name = styled(Typography)(() => ({
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '10px'
}));

const Info = styled(Typography)(() => ({
    fontSize: '20px',
}));

const FightButton = styled(Button)(({theme}) => ({
    background: `${theme.palette.secondary.dark}`
}));

const DeleteButton = styled(Button)(({theme}) => ({
    background: `${theme.palette.error.dark}`
}));

export type RobotViewProps = {
    robot: RobotType,
    deleteRobot: (robot: RobotType) => void,
    startFight: () => void,
};

export function RobotView({robot, deleteRobot, startFight}: RobotViewProps) {
    const [open, setOpen] = useState(false);

    const toggleDialog = () => {
      setOpen(!open);
    };

    const handleDeleteRobot = () => {
        toggleDialog();
        deleteRobot(robot);
    }

    return robot && (
        <Box>
            <Name variant='h2'>{robot.name}</Name>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Info>Attack:</Info>
                </Grid>
                <Grid item xs={6}>
                    <Info>{robot.attack}</Info>
                </Grid>
                <Grid item xs={6}>
                    <Info>Defense:</Info>
                </Grid>
                <Grid item xs={6}>
                    <Info>{robot.defense}</Info>
                </Grid>
                <Grid item xs={12}>
                    <Robot robot={robot} />
                </Grid>
                <Grid item xs={6}>
                    <FightButton variant='contained' onClick={startFight}>Choose</FightButton>
                </Grid>
                <Grid item xs={6}>
                    <DeleteButton variant='contained' onClick={toggleDialog}>Delete</DeleteButton>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={toggleDialog}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm delete?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={toggleDialog}>Cancel</Button>
                    <DeleteButton variant='contained' onClick={handleDeleteRobot}>Delete</DeleteButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}