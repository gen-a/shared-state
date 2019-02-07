## ShredState react Component

Simple state sharing among react components.

### Install

```bash
npm install --save sahred-state
```

Every state has to have own name. 
Components can be assign to one or many states by setting name property of SharedState component.
It pass selected sates data to the children with the props when updated.


### Basic Usage

```javascript
import React, { Component } from 'react'
import SahredState, { update } from 'shared-state'

class App extends Component {
  
    render() {
        return (
            <div>
              <SharedState name={['storeName', 'antherStoreName']}>
                    <Component />
              </SharedState>
              <SharedState name="storeName">
                    <Component />
              </SharedState>
            </div>
        );
    }
}

```

### Update with js

You can update shared state data from any piece of the code by calling update method
With three arguments stateName, the name of the state

```javascript
import { update } from 'shared-state'

update('storeName', 'newValue', ()=>{})

```


### Update by html input change


```javascript
import React, { Component } from 'react'
import SahredState, { update } from 'shared-state'

class App extends Component {
  
    render() {
        return (
            <div>
              <SharedState name="storeName">
                    <Input />
              </SharedState>
            </div>
        );
    }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.storeName.valueName};
  }
  render() {
    const {storeName, updateState} = this.props;
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={(e) => updateState('storeName', {...storeName, valueName: e.target.value})}
      />
    );
  }
}
```

### License

MIT (http://www.opensource.org/licenses/mit-license.php)
