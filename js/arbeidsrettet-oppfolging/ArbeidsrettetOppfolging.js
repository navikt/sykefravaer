import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Sidetittel, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Sidetopp from '../components/Sidetopp';
import Brodsmuler from '../components/Brodsmuler';
import HarAlleredeOppfolgingAlertstripe from './HarAlleredeOppfolgingAlertstripe';
import Veileder from './Veileder';
import MerVeiledning from './MerVeiledning';
import DinOkonomi from './DinOkonomi';
import KanDuBytteJobb from './KanDuBytteJobb';
import Forsikring from './Forsikring';
import HvaKanDuGjoreNa from './HvaKanDuGjoreNa';
import { pushToDataAOLayer } from './pushToAODataLayer';
import HotjarTrigger from '../components/HotjarTrigger';
import SidebannerLiten from '../components/SidebannerLiten';

class ArbeidsrettetOppfolging extends Component {
    componentDidMount() {
        const { underOppfolging } = this.props;
        const action = underOppfolging
            ? 'SIDE_VIST_UNDER_OPPFOLGING'
            : 'SIDE_VIST_IKKE_UNDER_OPPFOLGING';
        pushToDataAOLayer(action);
    }

    render() {
        const { underOppfolging, maksDato } = this.props;
        const brodsmuler = [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Varsling',
        }];
        const hotjarTrigger = underOppfolging
            ? 'ARBEIDSRETTET_OPPFOLGING_UNDER_OPPFOLGING'
            : 'ARBEIDSRETTET_OPPFOLGING_IKKE_UNDER_OPPFOLGING';


        // TODO: Get arbeidsgiver status
        const harArbeidsgiver = true;

        return (
            <HotjarTrigger hotjarTrigger={hotjarTrigger}>
                <SidebannerLiten />
                <div className="begrensning begrensning--bred brodsmulerWrapper">
                    <Brodsmuler brodsmuler={brodsmuler} />
                </div>
                <div className="begrensning begrensning--bred">
                    <div style={{ marginBottom: '3rem' }}>
                        <Bjorn>
                            <Normaltekst>
                        Det begynner å nærme seg datoen du ikke lenger kan få sykepenger. Tror du at du snart er tilbake i jobb, eller vil du trenge noe mer fra NAV? Her kan du se hvilke muligheter du har.
                            </Normaltekst>
                        </Bjorn>
                    </div>

                    <HvaKanDuGjoreNa harArbeidsgiver={harArbeidsgiver} />

                    <div style={{marginBottom: '3rem'}}>
                        <h2 className="panel__tittel">Andre muligheter</h2>
                        <Ekspanderbartpanel
                            tittel={(
                                <div>
                                    {harArbeidsgiver && <Undertittel style={{ marginBottom: '1rem' }}>Kan du bytte jobb?</Undertittel>}
                                    {!harArbeidsgiver && <Undertittel style={{ marginBottom: '1rem' }}>Finn en jobb som passer situasjonen din</Undertittel>}
                                    <Normaltekst>Av og til er det mulig å fungere bedre i en annen jobb enn den man ble sykmeldt fra.</Normaltekst>
                                </div>
                            )}
                        >
                            <ul>
                                <li>
På
                                    {' '}
                                    {' '}
                                    <Lenke href="https://arbeidsplassen.nav.no/">Arbeidsplassen</Lenke>
                                    {' '}
finner du alle utlyste stillinger i landet, og sjansen er god for å finne en jobb eller bli funnet av en arbeidsgiver.
                                </li>
                                <li>
Du kan snakke med
                                    {' '}
                                    <Lenke href="https://www.nav.no/person/kontakt-oss/nb/">en av våre veiledere</Lenke>
                                    {' '}
om hva som kan gjøre det lettere for deg å komme i ny jobb.
                                </li>
                            </ul>
                        </Ekspanderbartpanel>
                        <br />
                        <Ekspanderbartpanel
                            tittel={(
                                <div>
                                    <Undertittel style={{ marginBottom: '1rem' }}>Hvordan blir økonomien din?</Undertittel>
                                    {harArbeidsgiver && <Normaltekst>Det er bare sykepenger som erstatter inntekten din med 100 prosent. Du må derfor være forberedt på å gå ned i inntekt når sykepengene tar slutt.</Normaltekst>}
                                    {!harArbeidsgiver && <Normaltekst>Du kan ha rett til annen økonomisk støtte fra NAV hvis du ikke kan gå tilbake i jobb før sykepengene er slutt. Dette må du i tilfelle søke om.</Normaltekst>}
                                </div>
                            )}
                        >
                            {harArbeidsgiver && <Normaltekst>Du kan ha rett til annen økonomisk støtte fra NAV hvis du ikke kan gå tilbake i jobb før sykepengene er slutt. Dette må du i tilfelle søke om.</Normaltekst>}
                            {harArbeidsgiver && <br />}
                            <Normaltekst>
Vær oppmerksom på at du ikke går automatisk over på arbeidsavklaringspenger, du må selv søke om det.
                                {' '}
                                <Lenke href="https://www.nav.no/person/kontakt-oss/nb/">Hør gjerne med en veileder i NAV.</Lenke>
                            </Normaltekst>
                            <br />
                            <Normaltekst>Undersøk også hvilke rettigheter du har hos forsikringsselskapet eller pensjonskassen du er medlem i. Det er ikke NAV som administrerer slike ordninger.</Normaltekst>
                        </Ekspanderbartpanel>
                    </div>

                    <h2 className="panel__tittel">Ønsker du mer veiledning fra NAV?</h2>

                    <Hovedknapp>Ja</Hovedknapp>
                    <Knapp>Ikke nå</Knapp>

                    <p style={{ marginTop: '4rem' }} className="ikke-print blokk navigasjonsstripe">
                        <a className="tilbakelenke" href="/sykefravaer/">
                    Til hovedsiden Ditt sykefravaer
                        </a>
                    </p>
                </div>
            </HotjarTrigger>
        );
    }
}

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;

/*
<div className="begrensning begrensning--bred begrensning--hvit">
                    <div className="arbeidsrettetOppfolging">
                        { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
                        <Sidetopp
                            className="sidetopp--arbeidsrettetOppfolging"
                            tittel={getLedetekst('ao.sidetittel')} />
                        <Veileder maksDato={maksDato} />
                        <HvaKanDuGjoreNa />
                        { !underOppfolging ? <MerVeiledning /> : null }
                        <KanDuBytteJobb />
                        <DinOkonomi />
                        <Forsikring />
                    </div>
                </div>
                */
