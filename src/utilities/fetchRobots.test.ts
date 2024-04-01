import { expect, test } from 'vitest';
import { fetchRobots } from './fetchRobots';
import robotData from './robots.json';

test('fetches default robotData', async () => {
  const data = await fetchRobots();
  expect(data).toBe(robotData);
});