import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import FeriePermisjonEllerUtenlandsopphold from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FeriePermisjonEllerUtenlandsopphold';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import { ledetekster } from '../../../ledetekster_mock';

describe("FeriePermisjonEllerUtenlandsopphold", () => {

    let _ledetekster;
    let getSykepengesoknad;

    beforeEach(() => {
        _ledetekster = Object.assign({}, ledetekster, {
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal': "Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden %FOM% – %TOM%?",
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har': "Jeg har...",
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie': "tatt ut ferie",
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon': "hatt permisjon",
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge': 'oppholdt meg utenfor Norge',
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal': 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
            'sykepengesoknad.ferie-permisjon-utenlandsopphold.presisering-sykepenger-utlandet': 'Som hovedregel kan du bare få sykepenger når du oppholder deg i Norge. Du kan søke om å beholde sykepenger i en kort periode ved opphold utenfor Norge.'
        })
    });

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad()} ledetekster={_ledetekster} />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("harHattFeriePermisjonEllerUtenlandsopphold")
    });

    it("Skal vise riktig spørsmål", () => {
        const compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad({
            aktiviteter: [{
              "periode": {
                "fom": "2017-01-01",
                "tom": "2017-01-15"
              },
              "grad": 100,
              "avvik": null
            }, {
              "periode": {
                "fom": "2017-01-16",
                "tom": "2017-01-30"
              },
              "grad": 50,
              "avvik": null
            }]
        })} ledetekster={_ledetekster} />);
        expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 30.01.2017?");
    });

});