import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { fieldPropTypes } from '../../propTypes';
import JaEllerNei from '../sykepengesoknad-arbeidstaker/JaEllerNei';
import Radioknapper from '../skjema/Radioknapper';
import Periodevelger from '../skjema/datovelger/Periodevelger';
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
        id="egenmeldingsperioder-hjelpetekst">{getLedetekst('din-sykmelding.egenmeldingsperioder.hjelpetekst', ledetekstparams)}</Hjelpetekst>);

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
        id="forsikring-hjelpetekst">{getLedetekst('din-sykmelding.forsikring.hjelpetekst.tekst')}</Hjelpetekst>);
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
