import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import JaEllerNei from '../JaEllerNei';
import { toDatePrettyPrint, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import AngiTid from './AngiTid';

export const Aktivitet = ({ field, index, arbeidsgiver, autofill, untouch, gjenopptattArbeidFulltUtDato }) => {
    const ledetekstPrefix = field.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';
    let tomDato = field.periode.tom;

    if (gjenopptattArbeidFulltUtDato) {
        tomDato = new Date(gjenopptattArbeidFulltUtDato - (1000 * 60 * 60 * 24));
    }

    const hjelpetekst = field.grad !== 100 ? <Hjelpetekst
        tittel={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.aktiviteter.gradert.hjelpetekst.tekst')} /> : null;

    return (<JaEllerNei
        name={`aktiviteter[${index}].jobbetMerEnnPlanlagt`}
        intro={getLedetekst(`${ledetekstPrefix}.intro`, {
            '%FOM%': toDatePrettyPrint(field.periode.fom),
            '%TOM%': toDatePrettyPrint(tomDato),
            '%ARBEIDSGIVER%': arbeidsgiver,
            '%ARBEIDSGRAD%': 100 - field.grad,
        })}
        spoersmal={getLedetekst(`${ledetekstPrefix}.sporsmal`)}
        hjelpetekst={hjelpetekst}>
        <div>
            <h4 className="skjema__sporsmal">
                {
                    getLedetekst('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet', {
                        '%ARBEIDSGIVER%': arbeidsgiver,
                    })
                }
            </h4>
            <Fields
                autofill={autofill}
                untouch={untouch}
                component={AngiTid}
                aktivitetIndex={index}
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
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

const Aktiviteter = ({ fields, arbeidsgiver, autofill, untouch, gjenopptattArbeidFulltUtDato }) => {
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
                    untouch={untouch} />);
            })
        }
    </div>);
};

Aktiviteter.propTypes = {
    fields: PropTypes.array,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    arbeidsgiver: PropTypes.string,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

export default Aktiviteter;
