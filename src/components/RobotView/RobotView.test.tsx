import { expect, test } from 'vitest';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RobotView } from '..';
import RobotData from '../../utilities/robots.json';

const useRobot = RobotData[0];

test('displays selected robot', async () => {
    const {findAllByRole, findByText} = render(<RobotView 
        robot={useRobot}
        deleteRobot={() => null}
        startFight={() => null}
    />);
    const headings = await findAllByRole('heading');
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe('ElectroSpike');
    const attack = await findByText('52');
    const defense = await findByText('31');
    expect(attack).toBeTruthy();
    expect(defense).toBeTruthy();
});

test('displays delete confirmation', async () => {
    const {findAllByRole, findByText} = render(<RobotView 
        robot={useRobot}
        deleteRobot={() => null}
        startFight={() => null}
    />);
    const buttons = await findAllByRole('button');
    expect(buttons[0].textContent).toBe('Choose');
    expect(buttons[1].textContent).toBe('Delete');
    await userEvent.click(buttons[1]);
    const confirm = await findByText('Confirm delete?');
    expect(confirm).toBeTruthy();
});