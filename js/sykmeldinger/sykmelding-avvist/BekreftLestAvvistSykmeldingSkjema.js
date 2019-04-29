import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Field, reduxForm } from 'redux-form';
import Feilstripe from '../../components/Feilstripe';
import CheckboxSelvstendig from '../../components/skjema/CheckboxSelvstendig';
import { getSykmeldingSkjemanavn } from '../../enums/skjemanavn';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import { bekreftSmSykmeldingLest } from '../data/sm-sykmeldinger/smSykmeldingerActions';

const Skjema = (props) => {
    const { handleSubmit, smSykmelding, bekrefter, bekreftFeilet, doBekreftSmSykmeldingLest } = props;
    return (<form onSubmit={handleSubmit(() => {
        doBekreftSmSykmeldingLest(smSykmelding);
    })}>
        <Feilstripe vis={bekreftFeilet} className="blokk" />
        <div className="bekreftLestAvvistSykmelding">
            <Field
                name="bekreftetLest"
                disabled={bekrefter}
                component={CheckboxSelvstendig}
                id="bekreftetLest"
                label={getLedetekst('avvist-sykmelding.bekreft-label')} />
        </div>
        <div className="knapperad">
            <Hovedknapp type="submit" spinner={bekrefter} autoDisableVedSpinner>
                {getLedetekst('avvist-sykmelding.bekreft-knapp')}
            </Hovedknapp>
        </div>
    </form>);
};

Skjema.propTypes = {
    handleSubmit: PropTypes.func,
    smSykmelding: smSykmeldingPt,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    doBekreftSmSykmeldingLest: PropTypes.func,
};

const ReduxSkjema = reduxForm({
    validate: (values = {}) => {
        return values.bekreftetLest
            ? {}
            : {
                bekreftetLest: getLedetekst('avvist-sykmelding.bekreft-feilmelding'),
            };
    },
})(Skjema);

const Skjemaviser = (props) => {
    const { smSykmelding } = props;
    return smSykmelding.lestAvBrukerDato
        ? null
        : <ReduxSkjema {...props} />;
};

Skjemaviser.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const mapStateToProps = (state, ownProps) => {
    return {
        bekrefter: state.smSykmeldinger.bekrefter,
        bekreftFeilet: state.smSykmeldinger.bekreftFeilet,
        form: getSykmeldingSkjemanavn(ownProps.smSykmelding.id),
    };
};

const BekreftLestAvvistSykmeldingSkjema = connect(mapStateToProps, {
    doBekreftSmSykmeldingLest: bekreftSmSykmeldingLest,
})(Skjemaviser);

export default BekreftLestAvvistSykmeldingSkjema;
