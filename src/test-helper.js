import React from 'react';
import { shallow } from 'enzyme';

export const setup = (Component, props = {}, state = null) => {
  const wrapper = shallow(<Component {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

export const formatGrid = (grid) => {
  // eslint-disable-next-line max-len
  const xCoords = `    ${'            0            '} ${'             1            '} ${'             2            '} ${'             3            '} ${'             4            '}`;
  let gridString = [xCoords];
  for (let y = 0; y < grid.length; y++) {
    let rowString = `${y} - `;
    for (let x = 0; x < grid.length; x++) {
      rowString += `${JSON.stringify(grid[y][x])} `;
    }
    gridString.push(`${rowString}\n`);
  }
  gridString = gridString.join('\n');
  // eslint-disable-next-line no-console
  console.log(gridString);
};

export const findByTestAttr = (wrapper, testAttr) => wrapper.find(`[data-test='${testAttr}']`);
