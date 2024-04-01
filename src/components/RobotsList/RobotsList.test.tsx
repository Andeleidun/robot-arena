import { expect, test } from 'vitest';
import {render, screen} from '@testing-library/react';
import { RobotsList } from '..';
import RobotData from '../../utilities/robots.json';

test('displays default robots', async () => {
    render(<RobotsList robots={RobotData} handleRobotClick={() => null} />);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(10);
    expect(listItems[0].textContent).toContain('ElectroSpike');
    expect(listItems[1].textContent).toContain('ElektroWave');
    expect(listItems[2].textContent).toContain('Technoroid');
});