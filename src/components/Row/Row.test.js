import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Row from './Row'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<Row />", () => {
    let wrapper;
    let RowComponent;

    beforeEach( () => {
        wrapper = shallow(<Row />)
        RowComponent = wrapper.find("[data-test='component-row']")
    })

    it ("renders without error", () => {
        expect(RowComponent).toHaveLength(1)
      })
})