import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { getHtmlTittel, getHtmlBudskap } from '../../../../js/digisyfoNpm/components/tidslinje/HendelseBoble';

chai.use(chaiEnzyme());
const { expect } = chai;


describe('HendelseBoble', () => {
    describe('getHtmlTittel', () => {
        it('aktivitetkrav-varsel faar aktivitetskrav-tekst', () => {
            const hendelse = {
                antallDager: 20,
                type: 'AKTIVITETSKRAV_VARSEL',
                tekstkey: 'key',
                inntruffetdato: '2016-02-28',

            };
            const ledetekster = { 'key.tittel': '%DATO%' };
            const html = getHtmlTittel(hendelse, ledetekster);

            expect(html).to.be.equal('28. februar 2016');
        });

        it('ny-naermesteLeder-varsel faar nearmesteLeder-tekst', () => {
            const hendelse = {
                antallDager: 20,
                type: 'NY_NAERMESTE_LEDER',
                data: {
                    naermesteLeder: {
                        navn: 'navn',
                    },
                },
                inntruffetdato: '2016-02-28',
                tekstkey: 'key',
            };

            const ledetekster = {
                'key.tittel': '<h3>%DATO%</h3><p>Din arbeidsgiver har oppgitt <b>%NAERMESTELEDER%</b> som din personalansvarlige leder</p>',
            };
            const html = getHtmlTittel(hendelse, ledetekster);

            expect(html).to.be.equal('<h3>28. februar 2016</h3><p>Din arbeidsgiver har oppgitt <b>navn</b> som din personalansvarlige leder</p>');
        });

        it('default hendelse faar default tittel', () => {
            const hendelse = {
                tekstkey: 'key',
            };
            const ledetekster = {
                'key.tittel': 'tittel',
            };
            const html = getHtmlTittel(hendelse, ledetekster);

            expect(html).to.be.equal('<h3>tittel</h3>');
        });

        it('ny naermeste leder hendelse opphørt', () => {
            const hendelse = {
                tekstkey: 'key',
                type: 'NY_NAERMESTE_LEDER',
                data: {
                    naermesteLeder: {
                        aktivTom: '2016-02-02',
                        navn: 'navn',
                    },
                },
            };
            const ledetekster = {
                'key.budskap': '<p>Koblingen mellom deg og %NAVN% er %STATUS%</p>',
            };
            const html = getHtmlBudskap(hendelse, ledetekster);

            expect(html).to.be.equal('<p>Koblingen mellom deg og navn er opphørt den 2. februar 2016</p>');
        });

        it('ny naermeste leder hendelse aktiv', () => {
            const hendelse = {
                tekstkey: 'key',
                type: 'NY_NAERMESTE_LEDER',
                data: {
                    naermesteLeder: {
                        navn: 'navn',
                    },
                },
            };
            const ledetekster = {
                'key.budskap': '<p>Koblingen mellom deg og %NAVN% er %STATUS%</p>',
            };
            const html = getHtmlBudskap(hendelse, ledetekster);

            expect(html).to.be.equal('<p>Koblingen mellom deg og navn er aktiv</p>');
        });
    });
});
