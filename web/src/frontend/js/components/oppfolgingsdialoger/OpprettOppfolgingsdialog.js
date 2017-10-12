import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import ArbeidsgiverSkjema from './ArbeidsgiverSkjema';
import { getContextRoot } from '../../routers/paths';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '../../utils/sykmeldingUtils';

const OpprettOppfolgingsdialog = ({ sykmeldinger, naermesteLedere, oppfolgingsdialoger, avbrytHref, velgArbeidsgiver }) => {
    const arbeidsgivere = finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere);

    return (
        <div className="panel blokk velgarbeidsgiver__blokk">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={`${getContextRoot()}/img/svg/leder.svg`} alt="leder" />
                <h2 className="illustrertTittel__tittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.tittel')}</h2>
            </div>
            <ArbeidsgiverSkjema
                arbeidsgivere={arbeidsgivere}
                oppfolgingsdialoger={oppfolgingsdialoger}
                onSubmit={velgArbeidsgiver}
                avbrytHref={avbrytHref}
            />
        </div>
    );
};

OpprettOppfolgingsdialog.propTypes = {
    sykmeldinger: PropTypes.array,
    naermesteLedere: PropTypes.array,
    oppfolgingsdialoger: PropTypes.array,
    avbrytHref: PropTypes.string,
    velgArbeidsgiver: PropTypes.func,
};

export default OpprettOppfolgingsdialog;
