import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import ArbeidsgiverSkjema from './ArbeidsgiverSkjema';

const OpprettOppfolgingsdialog = ({ arbeidsgivere, avbrytHref, velgArbeidsgiver }) => {
    return (
        <div className="panel blokk velgarbeidsgiver__blokk">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src="/sykefravaer/img/svg/leder.svg" alt="leder" />
                <h2 className="illustrertTittel__tittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.tittel')}</h2>
            </div>
            <ArbeidsgiverSkjema
                arbeidsgivere={arbeidsgivere}
                onSubmit={velgArbeidsgiver}
                avbrytHref={avbrytHref}
            />
        </div>
    );
};

OpprettOppfolgingsdialog.propTypes = {
    arbeidsgivere: PropTypes.array,
    avbrytHref: PropTypes.string,
    velgArbeidsgiver: PropTypes.func,
};

export default OpprettOppfolgingsdialog;
