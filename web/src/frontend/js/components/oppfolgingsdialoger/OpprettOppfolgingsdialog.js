import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import ArbeidsgiverSkjemaForm from './ArbeidsgiverSkjema';
import { getContextRoot } from '../../routers/paths';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '../../utils/sykmeldingUtils';

const OpprettOppfolgingsdialog = ({ dinesykmeldinger, naermesteLedere, oppfolgingsdialoger, avbrytHref, velgArbeidsgiver }) => {
    const arbeidsgivere = finnArbeidsgivereForGyldigeSykmeldinger(dinesykmeldinger.data, naermesteLedere.data);

    return (
        <div className="panel blokk velgarbeidsgiver__blokk">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={`${getContextRoot()}/img/svg/leder.svg`} alt="leder" />
                <h2 className="illustrertTittel__tittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.tittel')}</h2>
            </div>
            <ArbeidsgiverSkjemaForm
                arbeidsgivere={arbeidsgivere}
                oppfolgingsdialoger={oppfolgingsdialoger}
                onSubmit={velgArbeidsgiver}
                avbrytHref={avbrytHref}
            />
        </div>
    );
};

OpprettOppfolgingsdialog.propTypes = {
    naermesteLedere: ledereReducerPt,
    dinesykmeldinger: dinesykmeldingerReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    avbrytHref: PropTypes.string,
    velgArbeidsgiver: PropTypes.func,
};

export default OpprettOppfolgingsdialog;
