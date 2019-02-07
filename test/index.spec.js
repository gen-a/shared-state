import React, {Component} from 'react';
import renderer from 'react-test-renderer';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});
import {shallow, mount} from 'enzyme';

// Component to be tested
import SharedState, {update} from '../src';

const Data = (props) => <div>{props.foo.bar}</div>;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.foo.bar};
  }
  render() {
    const {foo, updateState} = this.props;
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={(e) => updateState('foo', {...foo, bar: e.target.value})}
      />
    );
  }
}

describe('SharedState component testing...', () => {
    const dataComponent = renderer.create(<SharedState name="foo"><Data /></SharedState>);

    it('render correctly with empty state', () => {
      expect(dataComponent.toJSON()).toMatchSnapshot();
    });
    it('render correctly with updated state', () => {
      update('foo', {bar:2});
      expect(dataComponent.toJSON()).toMatchSnapshot();
    });
  it('change the value by input change event...', () => {
    const component = mount(<SharedState name="foo"><Input/></SharedState>);
    const domNode = component.find('input').getDOMNode();
    domNode.value = "33";
    component.find('input').simulate("change");
    expect(dataComponent.toJSON()).toMatchSnapshot();
  });
});
