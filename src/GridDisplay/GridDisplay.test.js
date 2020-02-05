import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import GridDisplay from './GridDisplay'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<GridDisplay />", () => {
  let wrapper;
  let GridDisplayComponent;

  beforeEach( () => {
    wrapper = shallow(<GridDisplay />)
    GridDisplayComponent = wrapper.find("[data-test='component-grid-display']")
  })

  it ("renders without error", () => {
    expect(GridDisplayComponent).toHaveLength(1)
  })
})