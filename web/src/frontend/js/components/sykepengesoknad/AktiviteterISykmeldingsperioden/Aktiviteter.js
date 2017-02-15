import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import JaEllerNei from '../JaEllerNei';
import { toDatePrettyPrint } from 'digisyfo-npm';
import AngiTid from './AngiTid';
import { getLedetekst } from 'digisyfo-npm';

export const Aktivitet = ({ field, index, arbeidsgiver, autofill, untouch, ledetekster }) => {
    const ledetekstPrefix = field.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';

    return (<JaEllerNei
        name={`aktiviteter[${index}].jobbetMerEnnPlanlagt`}
        intro={getLedetekst(`${ledetekstPrefix}.intro`, ledetekster, {
            '%FOM%': toDatePrettyPrint(field.periode.fom),
            '%TOM%': toDatePrettyPrint(field.periode.tom),
            '%ARBEIDSGIVER%': arbeidsgiver,
            '%ARBEIDSGRAD%': 100 - field.grad,
        })}
        spoersmal={getLedetekst(`${ledetekstPrefix}.sporsmal`, ledetekster)}>
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
                    `aktiviteter[${index}].avvik.enhet`]} />
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
};

const Aktiviteter = ({ fields, arbeidsgiver, autofill, untouch, ledetekster }) => {
    return (<div>
        {
            fields.map((field, index) => {
                return (<Aktivitet
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
};

export default Aktiviteter;
