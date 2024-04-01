import { expect, test } from 'vitest';
import {render, screen} from '@testing-library/react';
import { BattleHistory } from './BattleHistory';
import { mockHistory } from './mockHistory';

test('displays mock history', async () => {
    render(<BattleHistory fightHistory={mockHistory} />);
    const headings = await screen.findAllByRole('heading');
    const listItems = await screen.findAllByRole('listitem');
    expect(headings).toHaveLength(3);
    expect(headings[0].textContent).toBe('Player');
    expect(listItems).toHaveLength(10);
    expect(listItems[0].textContent).toContain('Test');
    expect(listItems[1].textContent).toContain('Loss');
    expect(listItems[2].textContent).toContain('Cybernova');
});