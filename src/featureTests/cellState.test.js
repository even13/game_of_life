import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
    let wrapper;
    let testGridModel = new Grid();

    beforeEach(() => {
        wrapper = setup(App, {}, { model: testGridModel });
    });

    describe("placing live cells from the browser", () => {
        let testCell;

        it('changes the value assigned to the clicked cell', () => {
            wrapper = mount(<App />);
            testCell = wrapper.find({ id: '00_cell' });
            testCell.simulate('click');
            testCell = wrapper.find({ id: '00_cell' });

            expect(testCell.prop('value')).toEqual("*");
        });
    });
});
