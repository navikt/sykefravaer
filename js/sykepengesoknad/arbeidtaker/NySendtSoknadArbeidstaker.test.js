import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from '@navikt/digisyfo-npm';
import { mount } from 'enzyme';
import { getSendtSoknadArbeidstaker } from '../../../test/mock/mockSendtSoknadArbeidstaker';
import { SendtSoknadArbeidstakerStatuspanel } from './NySendtSoknadArbeidstaker';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('NySendtSoknadArbeidstaker', () => {
    beforeEach(() => {
        setLedetekster({
            'statuspanel.status': 'Status',
            'sykepengesoknad.status-2.SENDT.til-arbeidsgiver': 'Sendt til %ARBEIDSGIVER% (org. nr. %ORGNR%): %SENDTTILARBEIDSGIVERDATO%',
            'sykepengesoknad.status-2.SENDT.til-nav': 'Sendt til NAV: %SENDTTILNAVDATO%',
            'sykepengesoknad.status-2.SENDT.til-arbeidsgiver-og-nav': 'Sendt til NAV og %ARBEIDSGIVER% (org. nr. %ORGNR%): %SENDTTILNAVDATO%',
            'sykepengesoknad.status-2.KORRIGERT': 'Korrigert',
            'sykepengesoknad.sykepengeinfo.tittel': 'Utbetaling av sykepenger',
            'sykepengesoknad.sykepengeinfo.til-arbeidsgiver': 'Du får sykepengene utbetalt fra arbeidsgiveren din.',
            'sykepengesoknad.sykepengeinfo.til-nav': 'Sykepenger utbetales etter at NAV har innvilget søknaden. ' +
                '<a href="link" target="_blank">Les om sykepenger og saksbehandlingstider.</a>',
            'sykepengesoknad.sykepengeinfo.til-arbeidsgiver-og-nav': '<a href="link" target="_blank">Les om sykepenger og saksbehandlingstider.</a>',
        });
    });

    it('Skal vise status når søknad er bare sendt til arbeidsgiver', () => {
        const soknad = getSendtSoknadArbeidstaker({
            sendtNav: null,
            sendtArbeidsgiver: new Date('2019-01-16'),
            arbeidsgiver: {
                navn: 'Testbedrift',
                orgnr: '123456789',
            },
        });
        const component = mount(<SendtSoknadArbeidstakerStatuspanel soknad={soknad} />);
        expect(component.text()).to.contain('Sendt til Testbedrift (org. nr. 123 456 789): 16. januar 2019');
        expect(component.text()).to.contain('Du får sykepengene utbetalt fra arbeidsgiveren din.');
    });

    it('Skal vise status når søknad er bare sendt til NAV', () => {
        const soknad = getSendtSoknadArbeidstaker({
            sendtArbeidsgiver: null,
            sendtNav: new Date('2019-01-16'),
            arbeidsgiver: {
                navn: 'Testbedrift',
                orgnr: '123456789',
            },
        });
        const component = mount(<SendtSoknadArbeidstakerStatuspanel soknad={soknad} />);
        expect(component.text()).to.contain('Sendt til NAV: 16. januar 2019');
        expect(component.text()).to.contain('Sykepenger utbetales etter at NAV har innvilget søknaden.');
    });


    it('Skal vise status når søknad er sendt til både NAV og arbeidsgiver', () => {
        const soknad = getSendtSoknadArbeidstaker({
            sendtNav: new Date('2019-01-16'),
            sendtArbeidsgiver: new Date('2019-01-16'),
            arbeidsgiver: {
                navn: 'Testbedrift',
                orgnr: '123456789',
            },
        });
        const component = mount(<SendtSoknadArbeidstakerStatuspanel soknad={soknad} />);
        expect(component.text()).to.contain('Sendt til NAV og Testbedrift (org. nr. 123 456 789): 16. januar 2019');
        expect(component.text()).to.contain('Les om sykepenger og saksbehandlingstider');
    });
});
