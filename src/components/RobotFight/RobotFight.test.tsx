import { expect, test } from 'vitest';
import {render} from '@testing-library/react';
import { RobotFight } from '..';
import RobotData from '../../utilities/robots.json';

const pcRobot = RobotData[0];
const npcRobot = RobotData[1];

test('displays fight', async () => {
    const {findAllByRole, findAllByText} = render(<RobotFight 
        pcRobot={pcRobot}
        npcRobot={npcRobot}
        recordFight={() => null}
    />);
    const headings = await findAllByRole('heading');
    const buttons = await findAllByRole('button');
    const healths = await findAllByText('Health:', { exact: false });
    expect(headings).toHaveLength(3);
    expect(headings[0].textContent).toBe('Fight!');
    expect(headings[1].textContent).toBe('ElectroSpike');
    expect(headings[2].textContent).toBe('ElektroWave');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toBe('Attack');
    expect(healths).toHaveLength(2);
    expect(healths[0].textContent?.replace(/\D/g,'')).toBe('100');
});
