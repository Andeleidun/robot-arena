import { styled } from '@mui/material/styles';
import { 
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from '@mui/material';
import { 
    SmartToy, 
    PrecisionManufacturing
} from '@mui/icons-material';
import type { RobotType, RobotsType } from '../../App';

const RobotList = styled(List)(() => ({
    margin: '10px auto'
}));

const RobotListItem = styled(ListItem)(({theme}) => ({
    background: theme.palette.background.paper,
}));

export type RobotsListProps = {
    robots: RobotsType,
    handleRobotClick: (robot: RobotType) => void,
};

export function RobotsList({robots, handleRobotClick}: RobotsListProps) {
    return (
        <Box sx={{ width: '100%' }} component="nav">
          <RobotList>
            {
                robots?.map((robot, index) => robot && (
                    <RobotListItem key={robot.name + index} disablePadding>
                        <ListItemButton onClick={() => handleRobotClick(robot)}>
                            <ListItemIcon>
                                {
                                    robot.attack > robot.defense ? (
                                        <PrecisionManufacturing sx={{color: robot.color}} />
                                    ) : (
                                        <SmartToy sx={{color: robot.color}} />
                                    )
                                }
                            </ListItemIcon>
                            <ListItemText primary={robot.name} />
                        </ListItemButton>
                    </RobotListItem>
                ))
            }
          </RobotList>
      </Box>
    )
}