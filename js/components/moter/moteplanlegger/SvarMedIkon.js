import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import {
    moteplanleggerDeltakerPt,
    moteplanleggerSvarPt,
} from '../../../propTypes';
import { getSvar, MULIGE_SVAR } from '../../../utils/moteUtils';
import { ARBEIDSGIVER } from '../../../enums/moteplanleggerDeltakerTyper';

const { PASSER, PASSER_IKKE } = MULIGE_SVAR;

const getIkonsti = filnavn => `${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/${filnavn}`;

const Ikon = ({ ikon }) => (
    <div className="alternativsvar__ikon">
        <img src={getIkonsti(ikon)} className="js-ikon-passer" alt="" />
    </div>
);

Ikon.propTypes = {
    ikon: PropTypes.string.isRequired,
};

const getSvartekst = (bruker, svar) => {
    const svarstr = getSvar(svar, bruker.svartidspunkt);
    switch (svarstr) {
        case PASSER: {
            return getLedetekst('mote.svar.status.kan-mote', {
                '%NAVN%': bruker.navn,
            });
        }
        case PASSER_IKKE: {
            return getLedetekst('mote.svar.status.kan-ikke-mote', {
                '%NAVN%': bruker.navn,
            });
        }
        default: {
            return getLedetekst('mote.svar.status.ikke-svart', {
                '%NAVN%': bruker.navn,
            });
        }
    }
};

const getIkonFilnavn = (bruker, svar) => {
    const svarstr = getSvar(svar, bruker.svartidspunkt);
    switch (svarstr) {
        case PASSER: {
            return 'status--kan.svg';
        }
        case PASSER_IKKE: {
            return 'status--kanikke.svg';
        }
        default: {
            return 'status--ikkesvar.svg';
        }
    }
};

const Svartekst = ({ tekst, deltakertype }) => (
    <div className="alternativsvar__tekst">
        <p>
            <span className="alternativsvar__deltakertype">
                {deltakertype}
:
            </span>
            {' '}
            {tekst}
        </p>
    </div>
);

Svartekst.propTypes = {
    tekst: PropTypes.string.isRequired,
    deltakertype: PropTypes.string.isRequired,
};

export const NavKan = () => (
    <li className="alternativsvar__svar js-navssvar">
        <Ikon ikon="status--kan.svg" />
        <Svartekst
            deltakertype="NAV"
            tekst={getLedetekst('mote.svar.status.kan-mote', {
                '%NAVN%': 'Veilederen',
            })} />
    </li>
);

export const SvarMedIkon = (
    {
        bruker,
        svar,
    },
) => {
    const deltakertype = bruker.type === ARBEIDSGIVER
        ? 'Arbeidsgiver'
        : 'Arbeidstaker';
    return (
        <li className="alternativsvar__svar js-annenssvar">
            <Ikon ikon={getIkonFilnavn(bruker, svar)} />
            <Svartekst deltakertype={`${deltakertype}en`} navn={bruker.navn} tekst={getSvartekst(bruker, svar)} />
        </li>
    );
};

SvarMedIkon.propTypes = {
    bruker: moteplanleggerDeltakerPt,
    svar: moteplanleggerSvarPt,
};
