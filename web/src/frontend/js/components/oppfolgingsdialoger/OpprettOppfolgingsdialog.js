import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import ArbeidsgiverSkjema from './ArbeidsgiverSkjema';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '../../utils/sykmeldingUtils';

const OpprettOppfolgingsdialog = ({ sykmeldinger, naermesteLedere, avbrytHref, velgArbeidsgiver }) => {
    const arbeidsgivere = finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere);

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
    sykmeldinger: PropTypes.array,
    naermesteLedere: PropTypes.array,
    avbrytHref: PropTypes.string,
    velgArbeidsgiver: PropTypes.func,
};

export default OpprettOppfolgingsdialog;
