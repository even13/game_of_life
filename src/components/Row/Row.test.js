import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Row from './Row'
import Cell from '../Cell/Cell'
import {setup, findByTestAttr} from '../../test-helper'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<Row />", () => {
    let wrapper;
    let RowComponent;

    beforeEach( () => {
        wrapper = setup(Row, {cells: []})
        RowComponent = findByTestAttr(wrapper, 'component-row')
    })

    it ("renders without error", () => {
        expect(RowComponent).toHaveLength(1)
    })

    it ("renders 3 cells when passed 3 cells", () => {
      wrapper = setup(Row, {cells: [1, 2, 3]})
      let cellComponent = findByTestAttr(wrapper, 'component-cell')
      expect(cellComponent).toHaveLength(3)
    })
})
