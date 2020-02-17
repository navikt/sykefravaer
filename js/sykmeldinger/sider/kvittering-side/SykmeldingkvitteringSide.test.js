import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import {
    setLedetekster, arbeidssituasjoner, sykmeldingstatuser, sykepengesoknadstatuser,
} from '@navikt/digisyfo-npm';
import SykmeldingKvitteringContainer, { mapStateToProps } from './SykmeldingkvitteringSide';
import StandardSykmeldingKvittering from '../../kvittering/varianter/StandardSykmeldingkvittering';
import FrilanserMedPapirsoknadKvittering from '../../kvittering/varianter/FrilanserMedPapirsoknadKvittering';
import FrilanserUtenSoknadKvittering from '../../kvittering/varianter/FrilanserUtenSoknadKvittering';
import SendtSykmeldingMedPapirSoknadKvittering from '../../kvittering/varianter/SendtSykmeldingMedPapirSoknadKvittering';
import AvventendeSykmeldingKvittering from '../../kvittering/varianter/AvventendeSykmeldingKvittering';

import getSykmelding from '../../../../test/mock/mockSykmeldinger';
import { getParsetSoknad } from '../../../../test/mock/mockSykepengesoknader';
import FrilanserSoekDigitaltNaa from '../../kvittering/varianter/FrilanserSoekDigitaltNaa';
import FrilanserSoekDigitaltSenere from '../../kvittering/varianter/FrilanserSoekDigitaltSenere';
import { SELVSTENDIGE_OG_FRILANSERE } from '../../../enums/soknadtyper';
import AnnetArbeidsledigKvittering from '../../kvittering/varianter/AnnetArbeidsledigKvittering';
import arbeidsgivere from '../../data/arbeidsgivere/arbeidsgivere';
import { aktuelleArbeidsgivereHentet } from '../../data/arbeidsgivere/arbeidsgivereActions';
import { FREMTIDIG } from '../../../enums/soknadstatuser';
import mockNySoknadArbeidstaker from '../../../../test/mock/mockNySoknadArbeidstaker';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('SykmeldingkvitteringSide', () => {
    const ownProps = {};
    const state = {};
    let nySoknad1;
    let nySoknad2;
    let nySoknad3;
    let nySoknad4;
    let fremtidigSoknad1;
    let fremtidigSoknad2;
    let fremtidigSoknadNyPlattform1;
    let fremtidigSoknadNyPlattform2;
    let sykmeldinger;
    let ledetekster;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);
    let clock;

    beforeEach(() => {
        sykmeldinger = [{
            id: '2',
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-12-31',
                    tom: '2016-01-06',
                    grad: 67,
                }],
            },
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }, {
            id: '1',
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-12-31',
                    tom: '2016-01-06',
                    grad: 67,
                }],
            },
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }, {
            id: '3',
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-12-31',
                    tom: '2016-01-06',
                    grad: 67,
                }],
            },
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }, {
            id: '4',
            status: 'BEKREFTET',
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-12-31',
                    tom: '2016-01-06',
                    grad: 67,
                }],
            },
        }, {
            id: '5',
            status: 'BEKREFTET',
            innsendtArbeidsgivernavn: null,
            orgnummer: null,
            arbeidsgiver: 'LOMMEN BARNEHAVE',
            valgtArbeidssituasjon: 'arbeidstaker',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-12-31',
                    tom: '2016-01-06',
                    grad: 67,
                }],
            },
        }];

        nySoknad1 = getParsetSoknad({
            sykmeldingId: '1',
            status: sykepengesoknadstatuser.NY,
        });

        nySoknad2 = getParsetSoknad({
            sykmeldingId: '2',
            status: sykepengesoknadstatuser.NY,
        });

        nySoknad3 = getParsetSoknad({
            sykmeldingId: '1',
            status: sykepengesoknadstatuser.NY,
        });

        nySoknad4 = getParsetSoknad({
            sykmeldingId: '1',
            status: sykepengesoknadstatuser.NY,
        });

        fremtidigSoknad1 = getParsetSoknad({
            sykmeldingId: '1',
            status: sykepengesoknadstatuser.FREMTIDIG,
        });

        fremtidigSoknad2 = getParsetSoknad({
            sykmeldingId: '1',
            status: sykepengesoknadstatuser.FREMTIDIG,
        });

        fremtidigSoknadNyPlattform1 = mockNySoknadArbeidstaker({
            sykmeldingId: '1',
            status: FREMTIDIG,
        });

        fremtidigSoknadNyPlattform2 = mockNySoknadArbeidstaker({
            sykmeldingId: '1',
            status: FREMTIDIG,
        });

        state.dineSykmeldinger = {
            data: sykmeldinger,
        };
        state.arbeidsgiversSykmeldinger = {
            data: sykmeldinger.map((s) => {
                return {
                    ...s,
                    valgtArbeidsgiver: {},
                };
            }),
        };
        state.ledetekster = {};
        state.brukerinfo = {
            bruker: {
                data: {
                    strengtFortroligAdresse: false,
                },
            },
            innlogging: {
                hentingFeilet: false,
            },
        };
        state.sykepengesoknader = {
            data: [nySoknad1, nySoknad2, nySoknad3, nySoknad4, fremtidigSoknad1],
        };
        state.soknader = {
            data: [],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        };
        state.sykmeldingMeta = {
            1: {
                erUtenforVentetid: false,
                skalOppretteSoknad: false,
            },
        };
        state.timeout = {};
        ownProps.params = {
            sykmeldingId: '1',
        };
        /* eslint-disable max-len */
        ledetekster = {
            'send-til-arbeidsgiver.kvittering.tittel': 'Sykmeldingen er sendt!',
            'send-til-arbeidsgiver.kvittering.undertekst': '<p>Sykmeldingen sendes til arbeidsgiveren din via Altinn. Det vil kunne ta noe tid før meldingen ligger i din arbeidsgivers innboks.</p> <h3>Du er ikke helt ferdig!</h3><p>Skal du søke om sykepenger, må du fylle ut det siste arket du fikk (del D), slik som før. Betaler arbeidsgiveren din lønn under sykdom, skal du sende den dit. Hvis ikke, skal du sende den til <a href="https://www.nav.no/no/Bedrift/Innhold+til+Bedrift-forside/Nyttig+a+vite/Adresser+til+NAV+Arbeid+og+ytelser+for+krav+om+sykepenger">NAV Arbeid og ytelser</a> i ditt fylke. Er du usikker, spør arbeidsgiveren din.</p>',
            'bekreft-sykmelding.kvittering.tittel': 'Du har bekreftet sykmeldingen',
            'bekreft-sykmelding.kvittering.undertekst': '<h3>Du er ikke helt ferdig!</h3><p>Skal du søke om sykepenger, må du fylle ut det siste arket du fikk (del D) og sende den til <a href="https://www.nav.no/no/Bedrift/Innhold+til+Bedrift-forside/Nyttig+a+vite/Adresser+til+NAV+Arbeid+og+ytelser+for+krav+om+sykepenger">NAV Arbeid og ytelser</a> i ditt fylke.</p>',
            'sykmelding.kvittering.sok-senere.steg-1.tittel-3': 'Nå har du gjort første del',
            'sykmelding.kvittering.sok-senere.steg-1.tekst-3': '<p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din</p>',
            'sykmelding.kvittering.sok-senere.steg-2.tittel-3': 'Om noen dager får du noen spørsmål',
            'sykmelding.kvittering.sok-senere.steg-2.tekst-3': '<p>Svarene bruker vi til å beregne sykepengene dine. Du må svare selv om arbeidsgiveren din betaler deg lønn mens du er syk. Det er fordi arbeidsgiveren kanskje skal ha tilbake penger fra NAV senere.</p><p>Du får melding fra oss om dette %DATOER%.</p><p>Skal du ha utbetalingen direkte fra NAV? <br />Minn gjerne arbeidsgiveren din på å sende inntektsopplysninger så tidlig som mulig. Da går saksbehandlingen fortere.</p><p>Fikk du sykmeldingen på papir hos legen? <br />Legg den bort. Det du gjør på nett erstatter papiret.</p><p>Skal du reise ut av Norge? <br /><a target="_blank" href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold">Se regler om sykepenger og opphold utenfor Norge.</a></p>',
            'sykmelding.kvittering.sok-na.steg-1.tittel-2': 'Da har du gjort første del',
            'sykmelding.kvittering.sok-na.steg-1.tekst-2': '<p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din</p>',
            'sykmelding.kvittering.sok-na.steg-2.tittel-2': 'Nå skal du svare noen spørsmål',
            'sykmelding.kvittering.sok-na.steg-2.tekst-2': '<p>Svarene bruker vi til å beregne sykepengene dine. Du må svare selv om arbeidsgiveren din betaler deg lønn mens du er syk. Det er fordi arbeidsgiveren kanskje skal ha tilbake penger fra NAV senere.</p>',
            'sykmelding.kvittering.sok-na.papir.tekst': '<p><strong>Fikk du sykmeldingen på papir hos legen? </strong><br />Legg den bort. Det du gjør på nett erstatter papiret.</p>',
            'bekreft-sykmelding.skjermingskode-6.kvittering.undertekst': '<p>Tekst for skjermingskode 6</p>',
            'bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel': 'Du har bekreftet sykmeldingen',
            'bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst': '<h3>Du er ikke helt ferdig!</h3><p>Skal du søke om sykepenger, må du fylle ut det siste arket du fikk (del D), slik som før. Betaler arbeidsgiveren din lønn under sykdom, skal du sende den dit. Hvis ikke, skal du sende den til <a href="https://www.nav.no/no/Bedrift/Innhold+til+Bedrift-forside/Nyttig+a+vite/Adresser+til+NAV+Arbeid+og+ytelser+for+krav+om+sykepenger">NAV Arbeid og ytelser</a> i ditt fylke. Er du usikker, spør arbeidsgiveren din. </p>',
            'bekreft-sykmelding.skal-opprettes-soknad.steg-1.tittel': 'Da har du bekreftet sykmeldingen',
            'bekreft-sykmelding.skal-opprettes-soknad.steg-2.tittel': 'Du må søke om sykepenger på papr',
            'bekreft-sykmelding.skal-opprettes-soknad.steg-2.tekst': '<p>Skal du søke om sykepenger, fyller du ut del D av papirsykmeldingen du fikk hos legen og <a href="https://www.nav.no/no/" target="_blank">inntektsopplysninger for selvstendig næringsdrivende.</a></p> <p><a href="https://www.nav.no/no/Bedrift/Innhold+til+Bedrift-forside/Nyttig+a+vite/Adresser+til+NAV+Arbeid+og+ytelser+for+krav+om+sykepenger--418649" target="_blank">Finn adressen du skal bruke.</a></p>',
            'bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel': 'Da har du bekreftet sykmeldingen',
            'bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst': '<p>NAV dekker ikke sykepenger for de første 16 dagene. Dette fraværet er beregnet til 16 dager eller kortere. Du trenger derfor ikke å søke om sykepenger for dette sykefraværet. </p> <p>Les gjerne om <a href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/Sykepenger+til+selvstendig+naringsdrivende+og+frilansere#chapter-1" target="_blank">sykepenger til selvstendig næringsdrivende og frilansere.</a></p>',
            'avbryt-sykmelding.kvittering.tittel': 'Sykmeldingen er avbrutt',
            'avbryt-sykmelding.kvittering.undertekst': '<p>Du kan ikke lenger sende sykmeldingen her fra nav.no.</p><p>Dette påvirker ikke dine muligheter for å levere den på papir.</p><p>Hvis du har avbrutt fordi du fant feil, bør du kontakte den som sykmeldte deg og få en ny.</p>',
            'bekreft-sykmelding.kvittering.digital-soknad.steg-1.tittel': 'Da har du gjort første del',
            'bekreft-sykmelding.kvittering.digital-soknad.steg-1.tekst': '<p>Du har bekreftet at du vil bruke sykmeldingen.</p>',
            'bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tittel': 'Hva med sykepengene?',
            'bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tekst': '<p>Dessverre oppstod det en feil som gjør at vi akkurat nå ikke vet om du trenger å søke om sykepenger.</p>',
            'bekreft-sykmelding.kvittering.sok-na.steg-2.tittel': 'Nå skal du svare på noen spørsmål',
            'bekreft-sykmelding.kvittering.sok-na.steg-2.tekst': '<p>Svarene bruker vi til å beregne sykepengene dine.</p>',
            'bekreft-sykmelding.kvittering.sok-senere.steg-2.tittel': 'Om noen dager får du noen spørsmål',
            'bekreft-sykmelding.kvittering.sok-senere.steg-2.tekst': '<p>Svarene bruker vi til å beregne sykepengene dine.</p><p>Du får melding fra oss om dette %DATOER%.</p><p>Fikk du sykmeldingen på papir hos legen?<br>Legg den bort. Det du gjør på nett erstatter papiret.</p><p>Skal du reise ut av Norge? <br><a target="_blank" href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold">Se regler om sykepenger og opphold utenfor Norge.</a></p>',
            'send-til-arbeidsgiver.kvittering.steg-1.tittel': 'Nå har du gjort første del',
            'send-til-arbeidsgiver.kvittering.steg-1.undertekst': '<p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din.</p>',
            'send-til-arbeidsgiver.kvittering.steg-2.tittel': 'Du må gjøre resten på papir',
            'send-til-arbeidsgiver.kvittering.steg-2.undertekst': '<p>Når sykefraværet er over, fyller du ut del D av papirsykmeldingen du fikk hos legen. Hvis du ikke har fått papiret, må du be legen om å få det.</p><p>Spør arbeidsgiveren din om du skal sende del D direkte til dem eller til NAV.</p> <p><a href="https://www.nav.no/no/Bedrift/Innhold+til+Bedrift-forside/Nyttig+a+vite/Adresser+til+NAV+Arbeid+og+ytelser+for+krav+om+sykepenger--418649" target="_blank">Finn riktig adresse til NAV.</a></p><p>Minn gjerne arbeidsgiveren din på å sende inntektsopplysninger så tidlig som mulig. Da går saksbehandlingen fortere.</p><p>Skal du reise ut av Norge? <br><a href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold" target="_blank">Se regler om sykepenger og opphold utenfor Norge</a></p>',
            'send-til-arbeidsgiver.kvittering.bjorn': '<p>Du lurer kanskje på hvorfor du må søke som sykepenger på papir?<br>Vi jobber med å digitalisere sykepengesøknaden for alle type sykmeldinger, men akkurat denne er vi ikke helt ferdige med.</p>',
            'bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.tittel': 'Nå har du gjort første del',
            'bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.undertekst': '<p>Du har bekreftet at du vil ta i bruk sykmeldingen.</p>',
            'bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.tittel': 'Du må gjøre resten på papir',
            'bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.undertekst': '<p>Når sykefraværet er over, fyller du ut del D av papirsykmeldingen du fikk hos legen. Hvis du ikke har fått papiret, må du be legen om å få det.</p><p>Skal du reise ut av Norge? <br><a href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold" target="_blank">Se regler om sykepenger og opphold utenfor Norge</a></p>',
            'bekreft-sykmelding.annet-arbeidsledig.kvittering.bjorn': '<p>Du lurer kanskje på hvorfor du må søke som sykepenger på papir?<br>Vi jobber med å digitalisere sykepengesøknaden for alle, men vi er ikke helt ferdige ennå.</p>',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.tittel': 'Nå har du levert første del',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.undertekst': '<p>Du har sendt sykmeldingen til arbeidsgiveren din.</p>',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.kort-sykmelding.tittel': 'Når sykmeldingen er utløpt, må du svare på noen spørsmål',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.kort-sykmelding.undertekst': '<p><strong>%DATO%</strong> får du en melding fra oss med lenke til noen spørsmål. Du må svare selv om arbeidsgiveren din betaler deg lønn mens du er syk. Vi bruker svarene til å beregne hvor mye arbeidsgiveren skal ha tilbake fra NAV.</p>',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.tittel': 'Nå har du levert første del',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.undertekst': 'Du har sendt sykmeldingen til arbeidsgiveren din.',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.lang-sykmelding.tittel': 'Senere må du svare på noen spørsmål',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.lang-sykmelding.undertekst': '<p><strong>%DATO%</strong> får du en melding fra oss med lenke til noen spørsmål. Du må svare selv om arbeidsgiveren din betaler deg lønn mens du er syk. Vi bruker svarene til å beregne hvor mye arbeidsgiveren skal ha tilbake fra NAV.</p><p>Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.</p>',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel': 'Nå har du levert første del',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.undertekst': 'Du har sendt sykmeldingen til arbeidsgiveren din.',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel': 'Når sykmeldingen er utløpt, kan du fylle ut søknaden om sykepenger',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.kort-sykmelding.undertekst': '<p><strong>%DATO%</strong> får du en melding fra oss med lenke til søknaden om sykepenger.</p><p>Minn gjerne arbeidsgiveren din på å sende inntektsopplysninger så tidlig som mulig. Da går saksbehandlingen fortere.</p>',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel': 'Nå har du levert første del',
            'sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.undertekst': '<p>Du har sendt sykmeldingen til arbeidsgiveren din.</p>',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel': 'Senere kan du fylle ut søknaden om sykepenger',
            'sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.lang-sykmelding.undertekst': '<p><strong>%DATO%</strong> får du en melding fra oss med lenke til søknaden om sykepenger.</p><p>Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.</p>',

        };
        /* eslint-enable max-len */
        setLedetekster(ledetekster);
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    const getComponent = (_state, _ownProps) => {
        const store = mockStore(_state);
        return mount(
            <Provider store={store}>
                <SykmeldingKvitteringContainer {..._ownProps} />
            </Provider>,
        );
    };

    const skalViseStandardSendtKvittering = (_state, _ownProps) => {
        const component = getComponent(_state, _ownProps);
        expect(component.text())
            .to
            .contain(ledetekster['send-til-arbeidsgiver.kvittering.steg-1.tittel']);
        expect(component.html())
            .to
            .contain(ledetekster['send-til-arbeidsgiver.kvittering.steg-1.undertekst']);
        expect(component.text())
            .to
            .contain(ledetekster['send-til-arbeidsgiver.kvittering.steg-2.tittel']);
        expect(component.html())
            .to
            .contain(ledetekster['send-til-arbeidsgiver.kvittering.steg-2.undertekst']);
        expect(component.html())
            .to
            .contain(ledetekster['send-til-arbeidsgiver.kvittering.bjorn']);
        expect(component.find(SendtSykmeldingMedPapirSoknadKvittering))
            .to
            .have
            .length(1);
    };

    const skalViseAvventendeSykmeldingKvittering = (_state, _ownProps) => {
        const component = getComponent(_state, _ownProps);
        expect(component.text())
            .to
            .contain('Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir lagt til rette for deg på arbeidsplassen.');
        expect(component.find(AvventendeSykmeldingKvittering))
            .to
            .have
            .length(1);
    };

    const skalViseStandardBekreftetKvittering = (_state, _ownProps) => {
        const component = getComponent(_state, _ownProps);
        expect(component.text())
            .to
            .contain(ledetekster['bekreft-sykmelding.kvittering.tittel']);
        expect(component.html())
            .to
            .contain(ledetekster['bekreft-sykmelding.kvittering.undertekst']);
        expect(component.find(StandardSykmeldingKvittering))
            .to
            .have
            .length(1);
    };

    const skalViseAnnetArbeidsledigKvittering = (_state, _ownProps) => {
        const component = getComponent(_state, _ownProps);
        expect(component.text())
            .to
            .contain(ledetekster['bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.tittel']);
        expect(component.html())
            .to
            .contain(ledetekster['bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.undertekst']);
        expect(component.text())
            .to
            .contain(ledetekster['bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.tittel']);
        expect(component.html())
            .to
            .contain(ledetekster['bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.undertekst']);
        expect(component.html())
            .to
            .contain(ledetekster['bekreft-sykmelding.annet-arbeidsledig.kvittering.bjorn']);
        expect(component.find(AnnetArbeidsledigKvittering))
            .to
            .have
            .length(1);
    };

    describe('SENDT sykmelding og valgt arbeidsgiver forskutterer lønn', () => {
        let sykmelding;
        let arbeidsgivereData;

        beforeEach(() => {
            arbeidsgivereData = [{
                navn: 'BERGEN KOMMUNE HR KONSERN',
                orgnummer: '123456789',
                naermesteLeder: {
                    aktoerId: '123',
                    navn: 'Fanny Storm',
                    epost: 'g@g.no',
                    mobil: '99887766',
                    orgnummer: '123456789',
                    organisasjonsnavn: null,
                    aktivTom: null,
                    arbeidsgiverForskuttererLoenn: true,
                },
                stilling: 'LÆRER (GRUNNSKOLE)',
            }];
            state.arbeidsgivere = arbeidsgivere(arbeidsgivere(), aktuelleArbeidsgivereHentet('1', arbeidsgivereData));
            sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.SENDT,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mottakendeArbeidsgiver: {
                    virksomhetsnummer: '123456789',
                },
            });
        });

        it('Skal vise standard sendt-kvittering hvis det ikke finnes søknader for denne sykmeldingen', () => {
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardSendtKvittering(state, ownProps);
        });

        it('Skal vise standard sendt-kvittering hvis det finnes søknader som ikke tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [nySoknad2];
            skalViseStandardSendtKvittering(state, ownProps);
        });

        it('Skal vise riktig kvittering hvis det finnes 1 fremtidig sykepengesøknad som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [fremtidigSoknad1];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('<strong>25. januar 2017</strong> får du en melding');
        });

        it('Skal vise riktig kvittering hvis det finnes 1 fremtidig sykepengesøknad på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [mockNySoknadArbeidstaker({
                sykmeldingId: sykmelding.id,
                status: FREMTIDIG,
                tom: new Date('2019-02-18'),
            })];

            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.kort-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('<strong>18. februar 2019</strong> får du en melding');
        });

        it('Skal vise riktig kvittering hvis det finnes 2 fremtidige sykepengesøknader som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [fremtidigSoknad1, fremtidigSoknad2];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.lang-sykmelding.tittel']);
            expect(component.text())
                .to
                .contain('Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.');
        });

        it('Skal vise riktig kvittering hvis det finnes 2 fremtidige sykepengesøknader på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [fremtidigSoknadNyPlattform1, fremtidigSoknadNyPlattform2];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer.lang-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer.lang-sykmelding.tittel']);
            expect(component.text())
                .to
                .contain('Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.');
        });

        it('Skal vise riktig kvittering hvis det finnes nye sykepengesøknader som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [nySoknad4];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tittel-2']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tekst-2']);
        });

        it('Skal vise riktig kvittering hvis det finnes nye sykepengesøknader på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [mockNySoknadArbeidstaker({
                sykmeldingId: sykmelding.id,
            })];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tittel-2']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tekst-2']);
        });

        it('Skal vise avventendeSykmelding-kvittering om sykmeldingen er avventende', () => {
            state.sykepengesoknader.data = [];
            sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.SENDT,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                mulighetForArbeid: {
                    perioder: [{
                        avventende: 'Trenger en bedre stol',
                    }],
                },
            });
            state.sykmeldingMeta['1'] = {
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
            };
            state.dineSykmeldinger.data = [sykmelding];
            skalViseAvventendeSykmeldingKvittering(state, ownProps);
        });
    });

    describe('SENDT sykmelding og valgt arbeidsgiver forskutterer ikke lønn', () => {
        let sykmelding;
        let arbeidsgivereData;

        beforeEach(() => {
            arbeidsgivereData = [{
                navn: 'BERGEN KOMMUNE HR KONSERN',
                orgnummer: '123456789',
                naermesteLeder: {
                    aktoerId: '123',
                    navn: 'Fanny Storm',
                    epost: 'g@g.no',
                    mobil: '99887766',
                    orgnummer: '123456789',
                    organisasjonsnavn: null,
                    aktivTom: null,
                    arbeidsgiverForskuttererLoenn: false,
                },
                stilling: 'LÆRER (GRUNNSKOLE)',
            }];
            state.arbeidsgivere = arbeidsgivere(arbeidsgivere(), aktuelleArbeidsgivereHentet('1', arbeidsgivereData));
            sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.SENDT,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mottakendeArbeidsgiver: {
                    virksomhetsnummer: '123456789',
                },
            });
        });

        it('Skal vise standard sendt-kvittering hvis det ikke finnes søknader for denne sykmeldingen', () => {
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardSendtKvittering(state, ownProps);
        });

        it('Skal vise standard sendt-kvittering hvis det finnes søknader som ikke tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [nySoknad2];
            skalViseStandardSendtKvittering(state, ownProps);
        });

        it('Skal vise riktig kvittering hvis det finnes 1 fremtidig sykepengesøknad som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [fremtidigSoknad1];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('<strong>25. januar 2017</strong> får du en melding');
        });

        it('Skal vise riktig kvittering hvis det finnes 1 fremtidig sykepengesøknad på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [fremtidigSoknadNyPlattform1];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.kort-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.kort-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('<strong>11. februar 2019</strong> får du en melding');
        });

        it('Skal vise riktig kvittering hvis det finnes 2 fremtidige sykepengesøknader som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [fremtidigSoknad1, fremtidigSoknad2];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.');
        });

        it('Skal vise riktig kvittering hvis det finnes 2 fremtidige sykepengesøknader på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [fremtidigSoknadNyPlattform1, fremtidigSoknadNyPlattform2];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-1.arbeidsgiver-forskutterer-ikke.lang-sykmelding.undertekst']);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-senere.steg-2.arbeidsgiver-forskutterer-ikke.lang-sykmelding.tittel']);
            expect(component.html())
                .to
                .contain('Siden sykmeldingen din er lang, får du lenken før hele sykmeldingen er utløpt.');
        });

        it('Skal vise riktig kvittering hvis det finnes nye sykepengesøknader som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [nySoknad4];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tittel-2']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tekst-2']);
        });


        it('Skal vise riktig kvittering hvis det finnes nye sykepengesøknader på ny plattform som tilhører denne sykmeldingen', () => {
            state.dineSykmeldinger.data = [sykmelding];
            state.sykepengesoknader.data = [];
            state.soknader.data = [mockNySoknadArbeidstaker({
                sykmeldingId: sykmelding.id,
            })];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tittel-2']);
            expect(component.html())
                .to
                .contain(ledetekster['sykmelding.kvittering.sok-na.steg-1.tekst-2']);
        });
    });

    describe('BEKREFTET sykmelding for arbeidstakere', () => {
        it('Skal vise riktig kvittering hvis arbeidssituasjon er ARBEIDSTAKER', () => {
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
            });
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst']);
        });

        it('Skal vise riktig kvittering hvis arbeidssituasjon er ARBEIDSTAKER og bruker har strengt fortrolig adresse', () => {
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
            });
            state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['bekreft-sykmelding.skjermingskode-6.kvittering.undertekst']);
        });
    });

    describe('BEKREFTET sykmelding for frilansere', () => {
        const skalViseInfoOmAtBrukerKanSoke = (_state, _ownProps) => {
            const component = getComponent(_state, _ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['bekreft-sykmelding.skal-opprettes-soknad.steg-1.tittel']);
            expect(component.text())
                .to
                .contain(ledetekster['bekreft-sykmelding.skal-opprettes-soknad.steg-2.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['bekreft-sykmelding.skal-opprettes-soknad.steg-2.tekst']);
            expect(component.find(FrilanserMedPapirsoknadKvittering))
                .to
                .have
                .length(1);
        };

        const skalViseInfoOmAtFrilanserKanSokNaa = (_state, _ownProps) => {
            const component = getComponent(_state, _ownProps);
            expect(component.find(FrilanserSoekDigitaltNaa))
                .to
                .have
                .length(1);
        };

        const skalViseInfoOmAtFrilanserKanSokSenere = (_state, _ownProps) => {
            const component = getComponent(_state, _ownProps);
            expect(component.find(FrilanserSoekDigitaltSenere))
                .to
                .have
                .length(1);
        };

        it('Skal vise standard bekreftet-kvittering om sykmeldingen er avventende', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                mulighetForArbeid: {
                    perioder: [{
                        avventende: 'Trenger en bedre stol',
                    }],
                },
            });
            state.sykmeldingMeta['1'] = {
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
            };
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardBekreftetKvittering(state, ownProps);
        });

        it('Skal vise standard bekreftet-kvittering om sykmeldingen har reisetilskudd', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mulighetForArbeid: {
                    perioder: [{
                        reisetilskudd: true,
                    }],
                },
            });
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardBekreftetKvittering(state, ownProps);
        });

        it('Skal vise standard bekreftet-kvittering om sykmeldingen har behandlingsdager', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mulighetForArbeid: {
                    perioder: [{
                        behandlingsdager: 4,
                    }],
                },
            });
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardBekreftetKvittering(state, ownProps);
        });

        describe('Når det ikke finnes søknader tilknyttet sykmeldingen', () => {
            beforeEach(() => {
                state.soknader = {
                    data: [],
                    hentet: true,
                    hentingFeilet: false,
                };
            });

            it('Skal vise info om at bruker ikke trenger å søke hvis skalOppretteSoknad === false', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: false,
                    skalOppretteSoknad: false,
                };
                const component = getComponent(state, ownProps);
                expect(component.text())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel']);
                expect(component.html())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst']);
                expect(component.find(FrilanserMedPapirsoknadKvittering))
                    .to
                    .have
                    .length(0);
                expect(component.find(FrilanserUtenSoknadKvittering))
                    .to
                    .have
                    .length(1);
            });

            it('Skal vise info om at bruker kan søke hvis skalOppretteSoknad === true', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: false,
                    skalOppretteSoknad: true,
                };
                state.dineSykmeldinger.data = [sykmelding];
                skalViseInfoOmAtBrukerKanSoke(state, ownProps);
            });
        });


        it('Skal vise standard bekreftet-kvittering om sykmeldingen har reisetilskudd', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mulighetForArbeid: {
                    perioder: [{
                        reisetilskudd: true,
                    }],
                },
            });
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardBekreftetKvittering(state, ownProps);
        });

        it('Skal vise standard bekreftet-kvittering om sykmeldingen har behandlingsdager', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
                mulighetForArbeid: {
                    perioder: [{
                        behandlingsdager: 4,
                    }],
                },
            });
            state.dineSykmeldinger.data = [sykmelding];
            skalViseStandardBekreftetKvittering(state, ownProps);
        });

        it('Skal vise info om at det ikke er nødvendig å søke dersom sykmeldingen ikke genererer søknader og skalOppretteSoknad = false', () => {
            state.sykepengesoknader.data = [];
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2018-02-02'),
                        tom: new Date('2018-02-20'),
                    }],
                },
            });
            state.dineSykmeldinger.data = [sykmelding];
            state.sykmeldingMeta['1'] = {
                erUtenforVentetid: true,
                skalOppretteSoknad: false,
            };
            state.soknader.data = [{
                sykmeldingId: 'ikke-relevant-sykmelding-id',
                status: 'NY',
                tom: new Date('2018-01-10'),
                soknadstype: SELVSTENDIGE_OG_FRILANSERE,
            }];
            const component = getComponent(state, ownProps);
            expect(component.find(FrilanserUtenSoknadKvittering))
                .to
                .have
                .length(1);
            expect(component.text())
                .to
                .contain(ledetekster['bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst']);
            expect(component.find(FrilanserMedPapirsoknadKvittering))
                .to
                .have
                .length(0);
        });

        describe('Når sykmeldingen har generert en søknad som er NY', () => {
            beforeEach(() => {
                state.soknader.data = [{
                    sykmeldingId: '1',
                    status: 'NY',
                    tom: new Date('2018-01-10'),
                    soknadstype: SELVSTENDIGE_OG_FRILANSERE,
                }];
            });

            it('Skal vise info om at bruker kan søke om sykepenger', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    erUtenforVentetid: true,
                    skalOppretteSoknad: false,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: false,
                };
                skalViseInfoOmAtFrilanserKanSokNaa(state, ownProps);
            });

            it('Skal vise info om at bruker kan søke selv om bruker er kode6', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    erUtenforVentetid: true,
                    skalOppretteSoknad: true,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: true,
                };
                skalViseInfoOmAtFrilanserKanSokNaa(state, ownProps);
            });

            it('Skal vise info om at bruker kan søke om sykepenger', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: true,
                };
                skalViseInfoOmAtFrilanserKanSokNaa(state, ownProps);
            });
        });

        describe('Når sykmeldingen har generert en søknad som er FREMTIDIG', () => {
            beforeEach(() => {
                state.soknader.data = [{
                    sykmeldingId: '1',
                    status: 'FREMTIDIG',
                    tom: new Date('2018-02-14'),
                    soknadstype: SELVSTENDIGE_OG_FRILANSERE,
                }];
            });

            it('Skal vise info om at bruker kan søke om sykepenger senere', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    erUtenforVentetid: true,
                    skalOppretteSoknad: false,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: false,
                };
                skalViseInfoOmAtFrilanserKanSokSenere(state, ownProps);
            });

            it('Skal vise info om at bruker kan søke om sykepenger', () => {
                state.sykepengesoknader.data = [];
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: true,
                };
                skalViseInfoOmAtFrilanserKanSokSenere(state, ownProps);
            });
        });

        describe('Når vi ikke vet om sykmeldingen har generert søknad, pga feil ved henting av søknader', () => {
            beforeEach(() => {
                state.soknader.hentingFeilet = true;
            });

            it('Skal vise info om at sykmeldingen er bekreftet, men vi vet ikke om det finnes relevant søknad', () => {
                const sykmelding = getSykmelding({
                    id: '1',
                    status: sykmeldingstatuser.BEKREFTET,
                    valgtArbeidssituasjon: arbeidssituasjoner.FRILANSER,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2018-02-02'),
                            tom: new Date('2018-02-20'),
                        }],
                    },
                });
                state.dineSykmeldinger.data = [sykmelding];
                state.sykmeldingMeta['1'] = {
                    erUtenforVentetid: true,
                    skalOppretteSoknad: true,
                };
                const component = getComponent(state, ownProps);
                expect(component.text())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.kvittering.digital-soknad.steg-1.tittel']);
                expect(component.html())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.kvittering.digital-soknad.steg-1.tekst']);
                expect(component.text())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tittel']);
                expect(component.html())
                    .to
                    .contain(ledetekster['bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tekst']);
            });
        });
    });

    describe('BEKREFTET sykmelding for annet', () => {
        it('Skal vise annet/arbeidsledig-kvittering', () => {
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.ANNET,
                erUtenforVentetid: false,
            });
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            skalViseAnnetArbeidsledigKvittering(state, ownProps);
        });
    });

    describe('BEKREFTET sykmelding for arbeidsledig', () => {
        it('Skal vise annet/arbeidsledig-kvittering', () => {
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.BEKREFTET,
                valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSLEDIG,
                erUtenforVentetid: false,
            });
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            skalViseAnnetArbeidsledigKvittering(state, ownProps);
        });
    });

    describe('AVBRUTT sykmelding', () => {
        it('Skal vise riktig kvittering', () => {
            const sykmelding = getSykmelding({
                id: '1',
                status: sykmeldingstatuser.AVBRUTT,
                erUtenforVentetid: true,
                skalOppretteSoknad: true,
            });
            state.sykepengesoknader.data = [];
            state.dineSykmeldinger.data = [sykmelding];
            const component = getComponent(state, ownProps);
            expect(component.text())
                .to
                .contain(ledetekster['avbryt-sykmelding.kvittering.tittel']);
            expect(component.html())
                .to
                .contain(ledetekster['avbryt-sykmelding.kvittering.undertekst']);
        });
    });

    describe('mapStateToProps', () => {
        it('Skal returnere fremtidige soknader', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykepengesoknader)
                .to
                .deep
                .equal([fremtidigSoknad1]);
        });

        it('Skal returnere henter === true dersom sykmeldinger hentes', () => {
            state.dineSykmeldinger.henter = true;

            const res = mapStateToProps(state, ownProps);
            expect(res.henter)
                .to
                .equal(true);
        });

        it('Skal returnere henter === true dersom ledetekster hentes', () => {
            state.ledetekster.henter = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.henter)
                .to
                .equal(true);
        });

        it('Skal returnere henter === true dersom sykepengesoknader hentes', () => {
            state.sykepengesoknader.henter = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.henter)
                .to
                .equal(true);
        });

        it('Skal returnere sykmelding === undefined dersom sykmeldingen ikke finnes', () => {
            ownProps.params = {
                sykmeldingId: 'Ukjent_ID',
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding)
                .to
                .equal(undefined);
        });

        it('Skal returnere feil dersom det oppstår en feil med sykmeldinger', () => {
            state.dineSykmeldinger.hentingFeilet = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet)
                .to
                .equal(true);
        });

        it('Skal returnere feil dersom det oppstår en feil med ledetekster', () => {
            state.ledetekster.hentingFeilet = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet)
                .to
                .equal(true);
        });
    });
});
