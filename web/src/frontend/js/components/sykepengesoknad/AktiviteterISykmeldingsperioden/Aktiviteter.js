import React from 'react';
import PropTypes from 'prop-types';
import { Fields } from 'redux-form';
import { toDatePrettyPrint, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import JaEllerNei from '../JaEllerNei';
import AngiTid from './AngiTid';
import { soknadsaktivitet } from '../../../propTypes';

export const getAktivitetssporsmal = (aktivitet, arbeidsgiver, callback = getLedetekst) => {
    const ledetekstUgradert = 'sykepengesoknad.aktiviteter.ugradert.spoersmal-2';
    const ledetekstGradert = 'sykepengesoknad.aktiviteter.gradert.spoersmal-2';

    const nokkel = aktivitet.grad === 100 ? ledetekstUgradert : ledetekstGradert;
    const tomDato = aktivitet.periode.tom;

    return callback(nokkel, {
        '%FOM%': toDatePrettyPrint(aktivitet.periode.fom),
        '%TOM%': toDatePrettyPrint(tomDato),
        '%ARBEIDSGIVER%': arbeidsgiver,
        '%ARBEIDSGRAD%': 100 - aktivitet.grad,
    });
};

export const Aktivitet = ({ field, index, arbeidsgiver, autofill, untouch }) => {
    const hjelpetekst = field.grad !== 100 ? (<Hjelpetekst
        tittel={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tekst')} />) : null;

    return (<JaEllerNei
        name={`aktiviteter[${index}].jobbetMerEnnPlanlagt`}
        spoersmal={getAktivitetssporsmal(field, arbeidsgiver)}
        hjelpetekst={hjelpetekst}>
        <div>
            <Fields
                autofill={autofill}
                untouch={untouch}
                component={AngiTid}
                aktivitetIndex={index}
                arbeidsgiver={arbeidsgiver}
                periode={field.periode}
                names={[
                    `aktiviteter[${index}].avvik.arbeidsgrad`,
                    `aktiviteter[${index}].avvik.timer`,
                    `aktiviteter[${index}].avvik.arbeidstimerNormalUke`,
                    `aktiviteter[${index}].avvik.enhet`,
                    `aktiviteter[${index}].avvik.beregnetArbeidsgrad`,
                ]} />
        </div>
    </JaEllerNei>);
};

Aktivitet.propTypes = {
    field: soknadsaktivitet,
    index: PropTypes.number,
    arbeidsgiver: PropTypes.string,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
};

const Aktiviteter = ({ fields, arbeidsgiver, autofill, untouch }) => {
    return (<div>
        {
            fields.map((field, index) => {
                return (<Aktivitet
                    field={field}
                    index={index}
                    key={index}
                    arbeidsgiver={arbeidsgiver}
                    autofill={autofill}
                    untouch={untouch} />);
            })
        }
    </div>);
};

Aktiviteter.propTypes = {
    fields: PropTypes.arrayOf(soknadsaktivitet),
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    arbeidsgiver: PropTypes.string,
};

export default Aktiviteter;
