import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import Tidslinje from "../../js/components/tidslinje/Tidslinje.js";
import HendelseBoble from "../../js/components/tidslinje/HendelseBoble.js";
import HendelseTittel from "../../js/components/tidslinje/HendelseTittel.js";
import TidslinjeVelgArbeidssituasjonContainer from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

const hendelserData = [{
    "id": "00",
    "inntruffetdato": null,
    "type": "FØRSTE_SYKMELDINGSDAG",
    "antallDager": -1,
    "tekstkey": "tidslinje.forste-sykmeldingsdag",
    "data": {
        startdato: {
            "year": 2016,
            "month": "JUNE",
            "dayOfMonth": 12,
            "dayOfWeek": "SUNDAY",
            "dayOfYear": 164,
            "leapYear": true,
            "monthValue": 6,
            "era": "CE",
            "chronology": {
                "id": "ISO",
                "calendarType": "iso8601"
            }
        }
    }
}, {
    "id": "01",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 27,
    "tekstkey": "tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver"
}, {
    "id": "02",
    "type": "TID",
    "antallDager": 28,
    "tekstkey": "tidslinje.antall-uker.4"
}, {
    "id": "03",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 48,
    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver"
}, {
    "id": "04",
    "type": "TID",
    "antallDager": 49,
    "tekstkey": "tidslinje.antall-uker.7"
}, {
    "id": "05",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 55,
    "tekstkey": "tidslinje.med-arbeidsgiver.aktivitetskrav"
}, {
    "id": "06",
    "type": "TID",
    "antallDager": 56,
    "tekstkey": "tidslinje.antall-uker.8"
}, {
    "id": "07",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 181,
    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-nav"
}, {
    "id": "08",
    "type": "TID",
    "antallDager": 182,
    "tekstkey": "tidslinje.antall-uker.26"
}, {
    "id": "09",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 272,
    "tekstkey": "tidslinje.med-arbeidsgiver.langtidssykmeldt"
}, {
    "id": "010",
    "type": "TID",
    "antallDager": 273,
    "tekstkey": "tidslinje.antall-uker.39"
}, {
    "id": "011",
    "inntruffetdato": null,
    "type": "BOBLE",
    "antallDager": 364,
    "tekstkey": "tidslinje.med-arbeidsgiver.sluttfasen"
}]

describe("Tidslinje", () => {

    it("Skal rendre en HendelseTittel per tidspunkt og en HendelseBoble per boble", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} hendelser={hendelserData} />)
        expect(component.find(HendelseBoble)).to.have.length(6);
        expect(component.find(HendelseTittel)).to.have.length(6);
    });

})