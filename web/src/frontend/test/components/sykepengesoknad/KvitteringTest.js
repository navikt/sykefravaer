import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import Kvittering from '../../../js/components/sykepengesoknad/Kvittering';
import { setLedetekster } from 'digisyfo-npm';
import { getSoknad } from '../../mockSoknader';

describe("Kvittering", () => {

    let ledetekster;

    beforeEach(() => {
        ledetekster = {
            'sykepengesoknad.kvittering.tittel': "Generisk tittel",
            'sykepengesoknad.kvittering.tekst': "Generisk tekst",
            'sykepengesoknad.kvittering.til-arbeidsgiver.tittel': "Søknaden er sendt!",
            'sykepengesoknad.kvittering.til-arbeidsgiver.tekst': "<p>Søknaden er sendt til %ARBEIDSGIVER% via Altinn. Det vil kunne ta noe tid før meldingen ligger i din arbeidsgivers innboks.</p>",
            'sykepengesoknad.kvittering.til-arbeidsgiver-og-nav.tittel': 'Søknaden er sendt!',
            'sykepengesoknad.kvittering.til-arbeidsgiver-og-nav.tekst': '<p>Søknaden er sendt til %ARBEIDSGIVER% via Altinn og til NAV.  Det vil kunne ta noe tid før meldingen ligger i din arbeidsgivers innboks.</p>',
            'sykepengesoknad.kvittering.til-nav.tittel': 'Søknaden er sendt!',
            'sykepengesoknad.kvittering.til-nav.tekst': '<p>Søknaden er sendt til NAV.</p>',
        };
        setLedetekster(ledetekster);
    });

    it("Skal vise riktig ledetekst når søknaden er sendt (gammel løsning)", () => {
        const sykepengesoknad = getSoknad({
            status: "TIL_SENDING",
        });
        delete(sykepengesoknad.sendtTilNAVDato);
        delete(sykepengesoknad.sendtTilArbeidsgiverDato);
        const component = mount(<Kvittering sykepengesoknad={sykepengesoknad} />);
        expect(component.text()).to.contain("Generisk tittel");
        expect(component.text()).to.contain("Generisk tekst");
    });

    it("Skal vise riktig ledetekst når søknaden er sendt til bare arbeidsgiver", () => {
        const sykepengesoknad = getSoknad({
            status: "TIL_SENDING",
            sendtTilArbeidsgiverDato: new Date("2017-02-05"),
        });
        const component = mount(<Kvittering sykepengesoknad={sykepengesoknad} />);
        expect(component.text()).to.contain("Søknaden er sendt til BYGGMESTER BLOM AS via Altinn. Det vil kunne ta noe tid før meldingen ligger i din arbeidsgivers innboks.");
    });

    it("Skal vise riktig ledetekst når søknaden er sendt til bare NAV", () => {
        const sykepengesoknad = getSoknad({
            status: "TIL_SENDING",
            sendtTilNAVDato: new Date("2017-02-05"),
        });
        const component = mount(<Kvittering sykepengesoknad={sykepengesoknad} />);
        expect(component.text()).to.contain('Søknaden er sendt til NAV.');
    });

    it("Skal vise riktig ledetekst når søknaden er sendt til begge", () => {
        const sykepengesoknad = getSoknad({
            status: "TIL_SENDING",
            sendtTilArbeidsgiverDato: new Date("2017-02-05"),
            sendtTilNAVDato: new Date("2017-02-05"),
        });
        const component = mount(<Kvittering sykepengesoknad={sykepengesoknad} />);
        expect(component.text()).to.contain("Søknaden er sendt til BYGGMESTER BLOM AS via Altinn og til NAV.  Det vil kunne ta noe tid før meldingen ligger i din arbeidsgivers innboks.");
    });

});