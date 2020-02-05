import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Cell from './Cell'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<Cell />", () => {
    let wrapper;
    let CellComponent;

    beforeEach( () => {
        wrapper = shallow(<Cell />)
        CellComponent = wrapper.find("[data-test='component-cell']")
    })

    it ("renders without error", () => {
        expect(CellComponent).toHaveLength(1)
    })
})