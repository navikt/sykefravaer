import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import JaEllerNei from '../JaEllerNei';
import { toDatePrettyPrint } from 'digisyfo-npm';
import AngiTid from './AngiTid';
import { getLedetekst } from 'digisyfo-npm';

const _ledetekster = {
    'sykepengesoknad.aktiviteter.gradert.intro': 'I perioden %FOM% til perioden %TOM% skulle du jobbe %ARBEIDSGRAD% % av din normale arbeidstid hos %ARBEIDSGIVER%.',
    'sykepengesoknad.aktiviteter.gradert.sporsmal': 'Har du jobbet mer enn dette?',
    'sykepengesoknad.aktiviteter.ugradert.intro': 'I perioden %FOM% til perioden %TOM% skulle du ikke jobbe hos %ARBEIDSGIVER%.',
    'sykepengesoknad.aktiviteter.ugradert.sporsmal': 'Har du jobbet?',
};

const Aktivitet = ({ field, index, arbeidsgiver, autofill, untouch }) => {
    const ledetekstPrefix = field.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';

    return (<JaEllerNei
        name={`aktiviteter[${index}].jobbetMerEnnPlanlagt`}
        intro={getLedetekst(`${ledetekstPrefix}.intro`, _ledetekster, {
            '%FOM%': toDatePrettyPrint(field.periode.fom),
            '%TOM%': toDatePrettyPrint(field.periode.tom),
            '%ARBEIDSGIVER%': arbeidsgiver,
            '%ARBEIDSGRAD%': 100 - field.grad,
        })}
        spoersmal={getLedetekst(`${ledetekstPrefix}.sporsmal`, _ledetekster)}>
        <div>
            <h4 className="skjema__sporsmal">Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos {arbeidsgiver}?</h4>
            <Fields
                autofill={autofill}
                untouch={untouch}
                component={AngiTid}
                aktivitetIndex={index}
                names={[`aktiviteter[${index}].avvik.arbeidsgrad`, `aktiviteter[${index}].avvik.timer`, `aktiviteter[${index}].avvik.arbeidstimerNormalUke`, `aktiviteter[${index}].avvik.enhet`]} />
        </div>
    </JaEllerNei>);
};

Aktivitet.propTypes = {
    field: PropTypes.object,
    index: PropTypes.number,
    arbeidsgiver: PropTypes.string,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
};

const Aktiviteter = ({ fields, arbeidsgiver, autofill, untouch }) => {
    return (<div>
        {
            fields.map((field, index) => {
                return <Aktivitet field={field} index={index} key={index} arbeidsgiver={arbeidsgiver} autofill={autofill} untouch={untouch} />;
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
