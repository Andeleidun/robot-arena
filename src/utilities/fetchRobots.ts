import robotData from './robots.json';

export const fetchRobots = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(robotData);
        }, 100);
    });
};