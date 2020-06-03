import chai from 'chai';
import sinon from 'sinon';
import {
    hentMoteLandingssideUrl,
    erMotebehovTilgjengelig,
    MOTEBEHOV_SKJEMATYPE,
    erMotebehovUbesvart,
} from '../../js/utils/motebehovUtils';

const { expect } = chai;

describe('motebehovUtils', () => {
    let clock;
    beforeEach(() => {
        const dagensDato = new Date('2019-06-11');
        clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    describe('hentMoteLandingssideUrl', () => {
        it('Skal returnere url til landingsside for dialogmoter om skalViseMotebehov=true ', () => {
            const exp = '/dialogmote';
            const res = hentMoteLandingssideUrl(true);
            expect(res).to.equal(exp);
        });

        it('Skal returnere url til side for mote om skalViseMotebehov=false', () => {
            const exp = '/dialogmote/mote';
            const res = hentMoteLandingssideUrl(false);
            expect(res).to.equal(exp);
        });
    });

    describe('erMotebehovTilgjengelig', () => {
        let motebehovReducer;
        beforeEach(() => {
            const dagensDato = new Date('2019-06-11');
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
            motebehovReducer = {
                hentingForbudt: true,
            };
            expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(false);
        });

        it('skal returnere false, om visMotebehov er false', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: false,
                    skjemaType: null,
                    motebehov: null,
                },
            };
            expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(false);
        });

        it('skal returnere true, om visMotebehov er true og skjemaType!=SVAR_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
                    motebehov: null,
                },
            };
            expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(true);
        });

        it('skal returnere true, om visMotebehov er true og skjemaType=SVAR_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: null,
                },
            };
            expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(true);
        });
    });

    describe('erMotebehovUbesvart', () => {
        const motebehovSvar = {
            harMotebehov: true,
        };

        it('skal returnere false dersom henting av motebehov feilet', () => {
            const motebehovReducer = {
                hentingFeilet: true,
            };

            const resultat = erMotebehovUbesvart(motebehovReducer);
            const forventet = false;

            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov = false', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = erMotebehovUbesvart(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov=true, skjemaType!=SVAR_BEHOV med motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = erMotebehovUbesvart(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov=true, skjemaType=SVAR_BEHOV med motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = erMotebehovUbesvart(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true, om visMotevehov=true, skjemaType=SVAR_BEHOV uten motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: null,
                },
            };

            const resultat = erMotebehovUbesvart(motebehovReducer);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });
});
