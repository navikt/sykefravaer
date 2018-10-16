import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { SoknadOppsummering, VaerKlarOverAt, BekreftetKorrektInformasjon, setLedetekster } from 'digisyfo-npm';
import sinon from 'sinon';
import SendtSoknad, { Knapperad, ConnectedKnapperad } from '../../../js/components/sykepengesoknad-arbeidstaker/SendtSoknad';
import KorrigertAvContainer from '../../../js/containers/sykepengesoknad-arbeidstaker/KorrigertAvContainer';
import Soknadstatuspanel from '../../../js/components/sykepengesoknad-arbeidstaker/Soknadstatuspanel';
import { getSoknad } from '../../mockSykepengesoknader';
import ledetekster from '../../mockLedetekster';
import SykepengesoknadHeader from '../../../js/components/sykepengesoknad-felles/SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../../js/containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SendtSoknad', () => {
    let component;
    let sykepengesoknad = getSoknad();

    beforeEach(() => {
        setLedetekster(Object.assign({}, ledetekster, {
            'sykepengesoknad.oppsummering.status.label': 'Status',
            'sykepengesoknad.status.TIL_SENDING': 'Sendes...',
            'sykepengesoknad.status.KORRIGERT': 'Korrigert',
        }));
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
    });

    it('Skal inneholde en SykepengesoknadHeader', () => {
        expect(component.contains(<SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />)).to.equal(true);
    });

    it('Skal inneholde et SykmeldingUtdragForSelvstendige', () => {
        expect(component.contains(<SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} />)).to.equal(true);
    });

    it('Skal inneholde en SoknadOppsummering, VaerKlarOverAt og BekreftetKorrektInformasjon', () => {
        const oppsummeringsoknad = {
            test: 'test',
        };
        sykepengesoknad.oppsummering = oppsummeringsoknad;
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<SoknadOppsummering oppsummeringsoknad={oppsummeringsoknad} />)).to.equal(true);
        expect(component.contains(<VaerKlarOverAt oppsummeringsoknad={oppsummeringsoknad} />)).to.equal(true);
        expect(component.contains(<BekreftetKorrektInformasjon oppsummeringsoknad={oppsummeringsoknad} />)).to.equal(true);
    });

    it('Skal inneholde Soknadstatuspanel', () => {
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(Soknadstatuspanel)).to.have.length(1);
    });

    it('Skal inneholde en ConnectedKnapperad', () => {
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(ConnectedKnapperad)).to.have.length(1);
    });

    it('Skal ikke inneholde en ConnectedKnapperad hvis søknaden har status KORRIGERT', () => {
        sykepengesoknad.status = 'KORRIGERT';
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(ConnectedKnapperad)).to.have.length(0);
    });

    it('Skal ikke inneholde en ConnectedKnapperad hvis søknaden har status TIL_SENDING', () => {
        sykepengesoknad.status = 'TIL_SENDING';
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(ConnectedKnapperad)).to.have.length(0);
    });

    describe('Når søknaden er korrigert', () => {
        beforeEach(() => {
            sykepengesoknad = getSoknad({
                status: 'KORRIGERT',
            });
            component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        });

        it('Skal inneholde KorrigertAvContainer', () => {
            expect(component.find(KorrigertAvContainer)).to.have.length(1);
        });
    });

    describe('Knapperad', () => {
        let clock;

        beforeEach(() => {
            clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        });

        afterEach(() => {
            clock.restore();
        });

        it('1) Skal inneholde en knapp for å endre søknaden hvis det er mindre enn tre måneder siden søknaden ble sendt', () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: '88',
                sendtTilNAVDato: new Date('2017-01-14'),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find('.js-endre')).to.have.length(1);
        });

        it('2) Skal ikke inneholde en knapp for å endre søknaden hvis det er mer enn tre måneder siden søknaden ble sendt', () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: '88',
                sendtTilNAVDato: new Date('2016-09-16'),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find('.js-endre')).to.have.length(0);
        });

        // eslint-disable-next-line max-len
        it('3) Skal inneholde en knapp for å endre søknaden hvis det er mer enn tre måneder siden søknaden ble sendt til NAV men mindre enn tre måneder siden søknaden ble sendt til arbeidsgiver', () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: '88',
                sendtTilNAVDato: new Date('2016-09-16'),
                sendtTilArbeidsgiverDato: new Date('2016-12-20'),
            })} />);
            expect(component.find('.js-endre')).to.have.length(1);
        });

        it('4) Skal inneholde en knapp for å endre søknaden hvis det er nøyaktig tre måneder siden søknaden ble sendt', () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: '88',
                sendtTilNAVDato: new Date('2016-10-16'),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find('.js-endre')).to.have.length(1);
        });

        it('5) Skal ikke inneholde en knapp for å endre søknaden hvis det tre måneder og én dag siden søknaden ble sendt', () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: '88',
                sendtTilNAVDato: new Date('2016-09-15'),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find('.js-endre')).to.have.length(0);
        });

        it('Skal starte endring når man klikker på endre', () => {
            const startEndringForespurt = sinon.spy();
            const preventDefault = sinon.spy();
            component = shallow(<Knapperad sykepengesoknad={getSoknad({ id: '88', sendtTilNAVDato: new Date('2016-10-16') })} startEndringForespurt={startEndringForespurt} />);
            component.find('.js-endre').simulate('click', { preventDefault });
            expect(startEndringForespurt.called).to.equal(true);
            expect(startEndringForespurt.calledWith('88')).to.equal(true);
        });
    });
});
