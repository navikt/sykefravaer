import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

let temp = null;
const localS = {
    getItem: function(key) {
        return temp;
    },
    setItem: function(key, value) {
        temp = value;
    }
};

global.HTMLElement = window.HTMLElement;
global.localStorage = localS;
global.XMLHttpRequest = window.XMLHttpRequest;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.window.APP_SETTINGS = {
  APP_ROOT: '/sykefravaer',
};
copyProps(window, global);