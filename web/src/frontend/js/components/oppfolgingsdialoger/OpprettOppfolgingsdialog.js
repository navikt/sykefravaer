import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import ArbeidsgiverSkjema from './ArbeidsgiverSkjema';

const OpprettOppfolgingsdialog = ({ arbeidsgivere, ledetekster, avbrytHref, velgArbeidsgiver }) => {
    return (
        <div className="panel blokk blokk__velgarbeidsgiver">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src="/sykefravaer/img/svg/leder.svg" alt="leder" />
                <h2 className="illustrertTittel__tittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.tittel')}</h2>
            </div>
            {
                <ArbeidsgiverSkjema
                    arbeidsgivere={arbeidsgivere}
                    onSubmit={velgArbeidsgiver}
                    avbrytHref={avbrytHref}
                    ledetekster={ledetekster}
                />
            }
        </div>
    );
};

OpprettOppfolgingsdialog.propTypes = {
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    avbrytHref: PropTypes.string,
    endreArbeidsgiver: PropTypes.func,
    velgArbeidsgiver: PropTypes.func,
};

export default OpprettOppfolgingsdialog;
