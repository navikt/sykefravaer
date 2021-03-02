import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Sidetittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { getLedetekst, Bjorn } from '../digisyfoNpm';

import { brodsmule as brodsmulePt } from '../propTypes';
import Side from './Side';

const EgenmeldingPlaceholderContainer = ({ henterLedetekster, brodsmuler }) => {
    return (
        <Side
            tittel="Opprett egenmelding"
            brodsmuler={brodsmuler}
            laster={henterLedetekster}
        >
            <Sidetittel tag="h1" style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
            <Undertittel style={{ marginBottom: '3rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>

            <Bjorn hvit>
                <Normaltekst style={{ marginBottom: '1rem' }}>
                    Egenmeldingen for selvstendig næringsdrivende og frilansere er ikke lenger i bruk.
                    Fra 1. juni må du ha sykmelding fra lege også for sykefravær som handler om korona.

                </Normaltekst>
                <a href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykepenger/sykepenger-til-selvstendig-naringsdrivende-og-frilansere">
                    Les mer om sykepenger til selvstendig næringsdrivende og frilansere.
                </a>
            </Bjorn>

            <p style={{ marginTop: '4rem' }} className="ikke-print blokk navigasjonsstripe">
                <a className="tilbakelenke" href="/sykefravaer/">
                    DITT SYKEFRAVAER
                </a>
            </p>
        </Side>
    );
};

const mapStateToProps = (state) => {
    return {
        henterLedetekster: state.ledetekster.henter,
        brodsmuler: [
            {
                tittel: getLedetekst('landingsside.sidetittel'),
                sti: '/',
                erKlikkbar: true,
            },
            {
                tittel: 'Opprett egenmelding',
            },
        ],
    };
};

EgenmeldingPlaceholderContainer.propTypes = {
    henterLedetekster: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default connect(mapStateToProps)(EgenmeldingPlaceholderContainer);
