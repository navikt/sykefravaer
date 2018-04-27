import React from 'react';
import PropTypes from 'prop-types';
import { Fields } from 'redux-form';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import JaEllerNei from '../JaEllerNei';
import AngiTid from './AngiTid';
import { soknadsaktivitet } from '../../../propTypes';
import { getAktivitetssporsmal } from '../Oppsummering/sykepengesoknadSporsmal';
import { Bjorn } from '../../Hjelpeboble';

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
            <Bjorn nokkel="sykepengesoknad.angi-tid.bjorn" />
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
