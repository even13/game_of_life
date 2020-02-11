import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Row from './Row';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Row />', () => {
  let wrapper;
  let RowComponent;

  beforeEach(() => {
    wrapper = setup(Row, { cells: [] });
    RowComponent = findByTestAttr(wrapper, 'component-row');
  });

  it('renders without error', () => {
    expect(RowComponent).toHaveLength(1);
  });

  describe('rendering <Cells />s', () => {
    it('renders 3 cells when passed 3 cells', () => {
      wrapper = setup(Row, { cells: [1, 2, 3] });
      const cellComponent = findByTestAttr(wrapper, 'component-cell');
      expect(cellComponent).toHaveLength(3);
    });

    it('renders 8 cells when passed 8 cells', () => {
      wrapper = setup(Row, { cells: [1, 2, 3, 4, 5, 9, 't', 8] });
      const cellComponent = findByTestAttr(wrapper, 'component-cell');
      expect(cellComponent).toHaveLength(8);
    });
  });
});
