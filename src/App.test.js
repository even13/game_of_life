import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App'
import {setup, findByTestAttr} from './test-helper'
import Grid from './models/grid/grid'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<App />", () => {
    let wrapper;
    let appComponent;
    let testGridModel = new Grid()

    beforeEach( () => {
        wrapper = setup(App, {}, { model: testGridModel })
        appComponent = findByTestAttr(wrapper, 'component-app')
    });

    it('renders without error', () => {
        expect(appComponent).toHaveLength(1)
    });

    it('renders a <GridDisplay />', () => {
        const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');

        expect(gridDisplayComponent).toHaveLength(1)
    });

    describe('GridDisplay', () => {
        it('is assigned a grid model', () => {
            const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');
    
            expect(gridDisplayComponent.prop('model')).toEqual(testGridModel)
        });
    })

    describe('cell data', () => {

        describe('placing live cells', () => {
            
            it ("", () => {
                const testCell = wrapper.find({ 'data-test': 'component-grid-display'}).dive().find( { id: '0index'}).dive().find( { id: '0_cell'})
                // console.log(wrapper.find( { id: '0index'}).dive().find( { id: '0_cell'}).dive().debug() )
                // console.log(testCell.debug())
                testCell.simulate('click')
                console.log(testCell.props())
                expect(testCell.prop('value')).toEqual("*")
            })
            
            // wrapper.find().simulate('click')

        })

    })


})
