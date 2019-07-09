import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as hendelsetyper from '../../enums/hendelsetyper';
import {
    mapStateToProps,
    getAktivitetskravvisning,
    INGEN_AKTIVITETSKRAVVARSEL,
    NYTT_AKTIVITETSKRAVVARSEL,
    AKTIVITETSVARSELKVITTERING,
} from './AktivitetskravvarselSide';

chai.use(chaiEnzyme());
const { expect } = chai;

export const varselHendelse1 = {
    id: 1,
    type: hendelsetyper.AKTIVITETSKRAV_VARSEL,
    inntruffetdato: new Date('2017-09-06'),
};

export const varselHendelse2 = {
    id: 2,
    type: hendelsetyper.AKTIVITETSKRAV_VARSEL,
    inntruffetdato: new Date('2017-09-10'),
};

export const bekreftetHendelse1 = {
    id: 3,
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date('2017-09-08'),
    ressursId: '1',
};

export const bekreftetHendelse2 = {
    id: 4,
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date('2017-09-10'),
    ressursId: '1',
};

export const bekreftetHendelse3 = {
    id: 5,
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date('2017-09-12'),
    ressursId: '2',
};

export const ukjentHendelse = {
    id: 6,
    type: 'UKJENT_RANDOM_HENDELSE',
    inntruffetdato: new Date('2017-09-08'),
};

describe('AktivitetskravVarselContainer', () => {
    describe('getAktivitetskravvisning', () => {
        it("Skal returnere 'NYTT_AKTIVITETSKRAVVARSEL' dersom det er kommet et nytt varsel", () => {
            const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2];
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(NYTT_AKTIVITETSKRAVVARSEL);
        });

        it("Skal returnere 'INGEN_AKTIVITETSKRAVVARSEL' dersom det ikke finnes noe som helst", () => {
            const hendelser = [ukjentHendelse];
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(INGEN_AKTIVITETSKRAVVARSEL);
        });

        it("Skal returnere 'AKTIVITETSVARSELKVITTERING' dersom sist inntrufne varsel er av typen AKTIVITETSKRAV_BEKREFTET ", () => {
            const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, bekreftetHendelse2, bekreftetHendelse3];
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(AKTIVITETSVARSELKVITTERING);
        });

        it("Skal returnere 'AKTIVITETSVARSELKVITTERING' dersom et varsel er bekreftet samme dag som det har blitt opprettet", () => {
            const hendelser = [
                { id: 1, inntruffetdato: new Date('2017-08-02'), type: 'NY_NAERMESTE_LEDER' },
                {
                    id: 2, inntruffetdato: new Date('2017-09-18'), type: 'AKTIVITETSKRAV_VARSEL', ressursId: '',
                },
                {
                    id: 3, inntruffetdato: new Date('2017-09-18'), type: 'AKTIVITETSKRAV_BEKREFTET', ressursId: '2',
                }];
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(AKTIVITETSVARSELKVITTERING);
        });

        it("Skal returnere 'NYTT_AKTIVITETSKRAVVARSEL' dersom et varsel opprettes samme dag som brukeren har bekreftet et tidligere varsel", () => {
            const hendelser = [
                { id: 1, inntruffetdato: new Date('2017-08-02'), type: 'NY_NAERMESTE_LEDER' },
                {
                    id: 2, inntruffetdato: new Date('2017-09-17'), type: 'AKTIVITETSKRAV_VARSEL', ressursId: '',
                },
                {
                    id: 3, inntruffetdato: new Date('2017-09-18'), type: 'AKTIVITETSKRAV_BEKREFTET', ressursId: '2',
                },
                {
                    id: 4, inntruffetdato: new Date('2017-09-18'), type: 'AKTIVITETSKRAV_VARSEL', ressursId: '',
                }];
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(NYTT_AKTIVITETSKRAVVARSEL);
        });
    });
});

describe('mapStateToProps', () => {
    let state;

    beforeEach(() => {
        state = {
            ledetekster: {},
            hendelser: {},
        };
    });

    it('Skal returnere inntruffetDato på siste relevante hendelse når det er en bekreftet hendelse', () => {
        const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, varselHendelse2, bekreftetHendelse3, bekreftetHendelse2];
        state.hendelser.data = hendelser;
        const props = mapStateToProps(state);
        expect(props.bekreftetdato).to.deep.equal(bekreftetHendelse3.inntruffetdato);
    });

    it('Skal returnere inntruffetDato på siste relevante hendelse når den er et varsel', () => {
        const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, varselHendelse2, bekreftetHendelse2];
        state.hendelser.data = hendelser;
        const props = mapStateToProps(state);
        expect(props.varseldato).to.deep.equal(varselHendelse2.inntruffetdato);
    });
});
