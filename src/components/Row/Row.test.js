import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Row from './Row'
import Cell from '../Cell/Cell'

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

    it ("renders 3 cells when passed 3 cells", () => {
      wrapper = shallow(<Row cells={[
        <Cell key={1} data-test={'component-cell'}/>,
        <Cell key={2} data-test={'component-cell'}/>,
        <Cell key={3} data-test={'component-cell'}/>
      ]}/>)
        let cellComponent = wrapper.find("[data-test='component-cell']")
        expect(cellComponent).toHaveLength(3)
    })
})
