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
};

export const findByTestAttr = (wrapper, testAttr) => wrapper.find(`[data-test='${testAttr}']`);

export const defaultGameSettingsProps = {
  gameForm: {
    playerOneName: {
      type: 'text',
      value: '',
      config: {
        placeholder: 'Player One',
      },
    },
    playerTwoName: {
      type: 'text',
      value: '',
      config: {
        placeholder: 'Player Two',
      },
    },
    gridSize: {
      type: 'range',
      value: '30',
      validation: {
        max: '70',
        min: '10',
      },
      config: {
        label: 'Grid Size',
      },
    },
    numberOfFlags: {
      type: 'range',
      value: '4',
      validation: {
        max: '24',
        min: '4',
      },
      config: {
        step: '4',
        label: 'Flags',
      },
    },
    gameLength: {
      type: 'range',
      value: '500',
      validation: {
        max: '10000',
        min: '100',
      },
      config: {
        label: 'Game Length',
      },
    },
    gameSpeed: {
      type: 'range',
      value: '50',
      validation: {
        max: '1000',
        min: '2',
      },
      config: {
        label: 'Game Speed',
      },
    },
  },
  colorPickers: {
    playerOneColor: {
      value: '#E563ED',
    },
    playerTwoColor: {
      value: '#27cac9',
    },
  },
};
