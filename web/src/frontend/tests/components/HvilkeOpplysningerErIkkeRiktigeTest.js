import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import { reduxForm, Field } from 'redux-form';

chai.use(chaiEnzyme());
const expect = chai.expect;



