import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import ErOpplysningeneRiktige from '../../js/components/sykmelding/ErOpplysningeneRiktige';
import HvilkeOpplysningerErIkkeRiktige, { SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/HvilkeOpplysningerErIkkeRiktige';
import Radiogruppe from '../../js/components/skjema/Radiogruppe';
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import Checkbox from '../../js/components/skjema/Checkbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

