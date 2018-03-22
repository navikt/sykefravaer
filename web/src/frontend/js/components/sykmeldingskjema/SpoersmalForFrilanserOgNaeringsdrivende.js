import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, Hjelpetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { fieldPropTypes } from '../../propTypes';
import JaEllerNei from '../sykepengesoknad/JaEllerNei';
import Radioknapper from '../skjema/Radioknapper';
import Periodevelger from '../skjema/Periodevelger';
import { getOppfolgingstilfelleStartdato } from '../../utils/sykeforloepUtils';

export const Egenmeldingssporsmal = ({ oppfolgingstilfelleStartdato }) => {
    const tom = new Date(oppfolgingstilfelleStartdato);
    tom.setDate(tom.getDate() - 1);

    const fom = new Date(tom);
    fom.setMonth(fom.getMonth() - 2);

    const ledetekstparams = {
        '%DATO%': toDatePrettyPrint(oppfolgingstilfelleStartdato),
    };
    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsperioder-hjelpetekst"
        tittel={getLedetekst('din-sykmelding.egenmeldingsperioder.hjelpetekst-tittel', ledetekstparams)}
        tekst={getLedetekst('din-sykmelding.egenmeldingsperioder.hjelpetekst', ledetekstparams)} />);

    return (<JaEllerNei
        name="varSykmeldtEllerEgenmeldt"
        spoersmal={getLedetekst('din-sykmelding.egenmeldingsperioder.janei.sporsmal', ledetekstparams)}
        hjelpetekst={hjelpetekst}>
        <Periodevelger
            spoersmal={getLedetekst('din-sykmelding.egenmeldingsperioder.perioder.sporsmal', ledetekstparams)}
            tidligsteFom={fom}
            senesteTom={tom}
            name="egenmeldingsperioder" />
    </JaEllerNei>);
};

Egenmeldingssporsmal.propTypes = {
    oppfolgingstilfelleStartdato: PropTypes.instanceOf(Date),
};

const RendreForsikringstype = ({ input, meta }) => {
    return (<Radioknapper
        spoersmal={getLedetekst('din-sykmelding.forsikring.type.sporsmal')}
        input={input}
        meta={meta}>
        <i value="100" label={getLedetekst('din-sykmelding.forsikring.type.svar.100')} />
        <i value="75" label={getLedetekst('din-sykmelding.forsikring.type.svar.75')} />
    </Radioknapper>);
};

RendreForsikringstype.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
};

export const Forsikringssporsmal = () => {
    const hjelpetekst = (<Hjelpetekst
        id="forsikring-hjelpetekst"
        tittel={getLedetekst('din-sykmelding.forsikring.hjelpetekst.tittel')}
        tekst={getLedetekst('din-sykmelding.forsikring.hjelpetekst.tekst')} />);
    return (<JaEllerNei
        name="harForsikring"
        hjelpetekst={hjelpetekst}
        spoersmal={getLedetekst('din-sykmelding.forsikring.janei.sporsmal')}>
        <Field
            name="dekningsgrad"
            component={RendreForsikringstype} />
    </JaEllerNei>);
};

export const Spoersmal = ({ oppfolgingstilfelleStartdato }) => {
    return (<div>
        <Egenmeldingssporsmal oppfolgingstilfelleStartdato={oppfolgingstilfelleStartdato} />
        <Forsikringssporsmal />
    </div>);
};

Spoersmal.propTypes = {
    oppfolgingstilfelleStartdato: PropTypes.instanceOf(Date),
};

const mapStateToProps = (state, ownProps) => {
    return {
        oppfolgingstilfelleStartdato: getOppfolgingstilfelleStartdato(state.sykeforloep.data, ownProps.sykmeldingId),
    };
};

export default connect(mapStateToProps)(Spoersmal);
