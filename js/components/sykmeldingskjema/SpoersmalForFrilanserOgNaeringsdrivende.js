import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, tilLesbarDatoMedArstall } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import JaEllerNei, { JaEllerNeiRadioknapper } from '../sykepengesoknad-arbeidstaker/JaEllerNei';
import Periodevelger from '../skjema/datovelger/Periodevelger';
import { getOppfolgingstilfelleStartdato } from '../../utils/sykeforloepUtils';

export const Egenmeldingssporsmal = ({ oppfolgingstilfelleStartdato }) => {
    const tom = new Date(oppfolgingstilfelleStartdato);
    tom.setDate(tom.getDate() - 1);

    const fom = new Date(tom);
    fom.setMonth(fom.getMonth() - 2);

    const ledetekstparams = {
        '%DATO%': tilLesbarDatoMedArstall(oppfolgingstilfelleStartdato),
    };
    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsperioder-hjelpetekst">{getLedetekst('din-sykmelding.egenmeldingsperioder.hjelpetekst', ledetekstparams)}</Hjelpetekst>);

    return (<JaEllerNei
        name="harAnnetFravaer"
        spoersmal={getLedetekst('din-sykmelding.egenmeldingsperioder.janei.sporsmal', ledetekstparams)}
        hjelpetekst={hjelpetekst}>
        <Periodevelger
            spoersmal={getLedetekst('din-sykmelding.egenmeldingsperioder.perioder.sporsmal', ledetekstparams)}
            tidligsteFom={fom}
            senesteTom={tom}
            name="fravaersperioder" />
    </JaEllerNei>);
};

Egenmeldingssporsmal.propTypes = {
    oppfolgingstilfelleStartdato: PropTypes.instanceOf(Date),
};

export const Forsikringssporsmal = () => {
    const hjelpetekst = (<Hjelpetekst
        id="forsikring-hjelpetekst">{getLedetekst('din-sykmelding.forsikring.hjelpetekst.tekst')}</Hjelpetekst>);
    return (<div className="hovedsporsmal blokk--xs">
        <Field
            name="harForsikring"
            hjelpetekst={hjelpetekst}
            component={JaEllerNeiRadioknapper}
            spoersmal={getLedetekst('din-sykmelding.forsikring.janei.sporsmal')} />
    </div>);
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
