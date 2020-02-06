import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
    let wrapper;
    let testGridModel = new Grid(5);

    beforeEach(() => {
        wrapper = mount(<App />);
        wrapper.find({ id: '12_cell' }).simulate('click');
        wrapper.find({ id: '22_cell' }).simulate('click');
        wrapper.find({ id: '32_cell' }).simulate('click');
    });
    
    it('rotates a spinner by 90 degrees after one evolution', () => {
        const evolveButton = findByTestAttr(wrapper, 'evolution-button');
        evolveButton.simulate('click');
        expect(wrapper.find({ id: '21_cell' }).prop('value')).toEqual('*');
        expect(wrapper.find({ id: '12_cell' }).prop('value')).toEqual('-');
        
        expect(wrapper.find({ id: '22_cell' }).prop('value')).toEqual('*');
        
        expect(wrapper.find({ id: '23_cell' }).prop('value')).toEqual('*');
        expect(wrapper.find({ id: '32_cell' }).prop('value')).toEqual('-');
    });
    
    it('clears the selection after first evolution', () => {
        const evolveButton = findByTestAttr(wrapper, 'evolution-button');
        evolveButton.simulate('click');

        expect(wrapper.state('coords')).toEqual([]);
    });
});
