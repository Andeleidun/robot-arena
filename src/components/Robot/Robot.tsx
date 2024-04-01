import { styled } from '@mui/material/styles';
import { 
  Box,
} from '@mui/material';
import { 
    SmartToy, 
    PrecisionManufacturing
} from '@mui/icons-material';
import type { RobotType } from "../../App";

export function Robot({robot, slot}: {robot: RobotType, slot?: string}) {
    if (!robot) return undefined;
    const {attack, defense, color} = robot;
    const RobotBody = styled(Box)(() => ({
        height: `${attack * 2}px`,
        width: `${defense * 2}px`,
        backgroundColor: color,
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const iconStyle = {
        color: robot.color,
        background: '#fff',
    }
    const robotIcon = robot.attack > robot.defense ? (
        <PrecisionManufacturing sx={iconStyle} />
    ) : (
        <SmartToy sx={iconStyle} />
    );
    return (
        <RobotBody id={robot.name + slot}>
            {robotIcon}
        </RobotBody>
    );
}
