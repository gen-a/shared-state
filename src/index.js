import React, {Component} from 'react'
import PropTypes from 'prop-types'

const sharedStates = {};
const listeners = {};

const getTarget = (container, name, initialValue = {}) => {
  if (!Object.keys(container).includes(name)) container[name] = initialValue;
  return container[name];
};

const createListener = (name) => {
  return getTarget(listeners, name, []);
};

const subscribe = (name, object) => {
  createListener(name).push(object);
  return getTarget(sharedStates, name);
};

const unSubscribe = (object) => {
  Object.keys(listeners).forEach((name) => {
    listeners[name] = listeners[name].filter(value => value !== object);
  });
};
/**
 *
 * @param name {String} - the name of the store to be updated
 * @param state {*} - new state value
 * @param callback {Function} - optional callback o update value
 */
export const update = (name, state, callback = null) => {
  sharedStates[name] = state;
  if(listeners[name]){
    listeners[name].forEach(member => member.updateState(name, sharedStates[name]));
  }
  if (callback !== null) callback();
};
/**
 * The component for sharing states among children Components.
 * The linked states set by required name props that could array or string one.
 * It pass selected sate(s)'s data to the children with the props when updated
 */
export default class SharedState extends Component {
  state = {};

  static propTypes = {
    name: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired])
  };

  constructor(props, context, updater) {
    super(props, context, updater);
    const {name} = props;
    let state = {};

    if (Array.isArray(name)) {
      name.forEach((v) => { state = {...state, [v]:subscribe(v, this)}});
    } else {
      state = {...state, [name]:subscribe(name, this)};
    }
    this.state = state;
  }

  updateState(name, value){
    this.setState({ ...this.setState, [name]:value });
  }
  componentWillUnmount() {
    unSubscribe(this);
  }

  render() {
    const {state, name, children, ...otherProps} = this.props;
    const props = {
      ...otherProps,
      ...this.state,
      updateState: update
    };
    let result = null;
    if (children instanceof Array) {
      result = children.map((child, index) => (
        React.cloneElement(child, {...props, ...child.props, key: index})
      ));
    } else {
      if (typeof(children) !== 'undefined') {
        result = React.cloneElement(children, {...props, ...children.props});
      }
    }
    return (
      <>{result}</>
    )
  }
}