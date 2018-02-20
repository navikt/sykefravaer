import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import GjenopptattArbeidFulltUt from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/GjenopptattArbeidFulltUt';
import Datovelger from '../../../../js/components/skjema/Datovelger';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import { ledetekster } from '../../../mockLedetekster';
import { setLedetekster } from 'digisyfo-npm';

describe("GjenopptattArbeidFulltUt", () => {

    let _ledetekster;
    let getSykepengesoknad;

    beforeEach(() => {
        _ledetekster = Object.assign({}, ledetekster, {
            'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal': 'Har du gjenopptatt arbeidet ditt hos %ARBEIDSGIVER% fullt ut?',
            'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal-2': 'Har du gjenopptatt arbeidet ditt hos %ARBEIDSGIVER% før %DATO%?',
            'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal': "Når gjorde du det?"
        });
        setLedetekster(_ledetekster);
    });

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<GjenopptattArbeidFulltUt sykepengesoknad={getSoknad()} />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("harGjenopptattArbeidFulltUt")
    });

    it("Skal inneholde en JaEllerNei med riktig children (Datovelger)", () => {
        const compo = shallow(<GjenopptattArbeidFulltUt sykepengesoknad={getSoknad()} />);
        expect(compo.find(Datovelger)).to.have.length(1);
        expect(compo.find(Datovelger).prop("name")).to.equal("gjenopptattArbeidFulltUtDato");
        expect(compo.find(Datovelger).prop("id")).to.equal("gjenopptattArbeidFulltUtDato");
        expect(compo.find(Datovelger).prop("tidligsteFom")).to.deep.equal(new Date('2017-01-01'));
        expect(compo.find(Datovelger).prop("senesteTom")).to.deep.equal(new Date('2017-01-25'));
    });

    it("Skal vise riktig spørsmål", () => {
        const compo = shallow(<GjenopptattArbeidFulltUt sykepengesoknad={getSoknad({
            arbeidsgiver: {
                navn: "BYGGMESTER BLOM AS"
            }
        })} />);
        expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du gjenopptatt arbeidet ditt hos BYGGMESTER BLOM AS før 25.01.2017?")
    });

    it("Skal inneholde en label med tekst <når gjorde du det>", () => {
        const compo = shallow(<GjenopptattArbeidFulltUt sykepengesoknad={getSoknad({
            arbeidsgiver: {
                navn: "BYGGMESTER BLOM AS"
            }
        })} />);
        expect(compo.find("label").text()).to.equal("Når gjorde du det?")
    });

});