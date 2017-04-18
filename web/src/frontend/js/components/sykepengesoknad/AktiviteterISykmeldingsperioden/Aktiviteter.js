import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import JaEllerNei from '../JaEllerNei';
import { toDatePrettyPrint, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import AngiTid from './AngiTid';

export const Aktivitet = ({ field, index, arbeidsgiver, autofill, untouch, ledetekster, gjenopptattArbeidFulltUtDato }) => {
    const ledetekstPrefix = field.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';
    let tomDato = field.periode.tom;

    if (gjenopptattArbeidFulltUtDato) {
        tomDato = new Date(gjenopptattArbeidFulltUtDato - (1000 * 60 * 60 * 24));
    }

    const hjelpetekst = field.grad !== 100 ? <Hjelpetekst
        tittel={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tittel', ledetekster)}
        tekst={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tekst', ledetekster)} /> : null;

    return (<JaEllerNei
        name={`aktiviteter[${index}].jobbetMerEnnPlanlagt`}
        intro={getLedetekst(`${ledetekstPrefix}.intro`, ledetekster, {
            '%FOM%': toDatePrettyPrint(field.periode.fom),
            '%TOM%': toDatePrettyPrint(tomDato),
            '%ARBEIDSGIVER%': arbeidsgiver,
            '%ARBEIDSGRAD%': 100 - field.grad,
        })}
        spoersmal={getLedetekst(`${ledetekstPrefix}.sporsmal`, ledetekster)}
        hjelpetekst={hjelpetekst}>
        <div>
            <h4 className="skjema__sporsmal">
                {
                    getLedetekst('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet', ledetekster, {
                        '%ARBEIDSGIVER%': arbeidsgiver,
                    })
                }
            </h4>
            <Fields
                autofill={autofill}
                untouch={untouch}
                component={AngiTid}
                aktivitetIndex={index}
                ledetekster={ledetekster}
                names={[
                    `aktiviteter[${index}].avvik.arbeidsgrad`,
                    `aktiviteter[${index}].avvik.timer`,
                    `aktiviteter[${index}].avvik.arbeidstimerNormalUke`,
                    `aktiviteter[${index}].avvik.enhet`,
                ]} />
        </div>
    </JaEllerNei>);
};

Aktivitet.propTypes = {
    field: PropTypes.object,
    index: PropTypes.number,
    arbeidsgiver: PropTypes.string,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    ledetekster: PropTypes.object,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

const Aktiviteter = ({ fields, arbeidsgiver, autofill, untouch, ledetekster, gjenopptattArbeidFulltUtDato }) => {
    return (<div>
        {
            fields.map((field, index) => {
                return (<Aktivitet
                    gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato}
                    field={field}
                    index={index}
                    key={index}
                    arbeidsgiver={arbeidsgiver}
                    autofill={autofill}
                    untouch={untouch}
                    ledetekster={ledetekster} />);
            })
        }
    </div>);
};

Aktiviteter.propTypes = {
    fields: PropTypes.array,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    arbeidsgiver: PropTypes.string,
    ledetekster: PropTypes.object,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

export default Aktiviteter;
