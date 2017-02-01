import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import Egenmeldingsdager from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/Egenmeldingsdager';
import Periodevelger from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/Periodevelger';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import { ledetekster } from '../../../ledetekster_mock';

describe("Egenmeldingsdager", () => {

    let _ledetekster;
    let getSykepengesoknad;

    beforeEach(() => {
        _ledetekster = Object.assign({}, ledetekster, {
            'sykepengesoknad.egenmeldingsdager.janei.sporsmal': 'Brukte du egenmeldingsdager før det legemeldte fraværet startet den %DATO%?',
        })
    });

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad()} ledetekster={_ledetekster} />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("bruktEgenmeldingsdagerFoerLegemeldtFravaer")
    });

    it("Skal inneholde en JaEllerNei med riktig children", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad()} ledetekster={_ledetekster} />);
        expect(compo.find(Periodevelger)).to.have.length(1);
        expect(compo.find(Periodevelger).prop("name")).to.equal("egenmeldingsperioder");
    });

    it("Skal vise riktig spørsmål", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad({
            identdato: "2017-05-20"
        })} ledetekster={_ledetekster} />);
        expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Brukte du egenmeldingsdager før det legemeldte fraværet startet den 20.05.2017?")
    });

});