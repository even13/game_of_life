import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GameForm from '../components/GameForm/GameForm';
// import { findByTestAttr } from '../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('fillingForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<GameForm />);
  });

  it('takes information for two players named Sam and Andrew', async () => {
    const playerOneNameField = wrapper.find({ id: 'playerOneName' });
    const playerTwoNameField = wrapper.find({ id: 'playerTwoName' });
    await playerOneNameField.simulate('change', { target: { value: 'Sam' } });
    await playerTwoNameField.simulate('change', { target: { value: 'Andrew' } });
    setTimeout(() => {
      expect(wrapper.state('gameForm').playerOneName.value).toEqual('Sam');
      expect(wrapper.state('gameForm').playerTwoName.value).toEqual('Andrew');
    });
  });

  it('takes information for two players named Eve and Raluca', async () => {
    const playerOneNameField = wrapper.find({ id: 'playerOneName' });
    const playerTwoNameField = wrapper.find({ id: 'playerTwoName' });
    await playerOneNameField.simulate('change', { target: { value: 'Eve' } });
    await playerTwoNameField.simulate('change', { target: { value: 'Raluca' } });
    setTimeout(() => {
      expect(wrapper.state('gameForm').playerOneName.value).toEqual('Sam');
      expect(wrapper.state('gameForm').playerTwoName.value).toEqual('Andrew');
    });
  });

  it('takes information for a grid size of 10 x 10', async () => {
    const gridSize = wrapper.find({ id: 'gridSize' });
    await gridSize.simulate('change', { target: { value: '10' } });
    setTimeout(() => {
      expect(wrapper.state('gameForm').gridSize.value).toEqual('10');
    });
  });
});
