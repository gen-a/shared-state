import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });




import { expect as chaiExpect} from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';

global.chaiExpect = chaiExpect;

global.sinon = sinon;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;

