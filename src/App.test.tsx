import { test, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App', () => {
  const buttonText = 'View Battle History';
  test('Start with Robot Battle Arena title', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('heading').textContent).toBe('Robot Battle Arena');
  });
  test('Navigate to Battle History', async () => {
    const { findByText, findAllByRole, findByLabelText } = render(<App />);
    const historyButton = await findByText(buttonText);
    expect(historyButton).toBeTruthy();
    await userEvent.click(historyButton);
    const headings = await findAllByRole('heading');
    const backButton = await findByLabelText('Go back');
    expect(headings).toHaveLength(4);
    expect(backButton).toBeTruthy();
  });
});
