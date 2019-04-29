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
        <div className="bekreftAktivitetskrav">
            <Field
                name="bekreftAktivitetskrav"
                component={CheckboxSelvstendig}
                id="bekreftAktivitetskrav"
                label={getLedetekst('avvist-sykmelding.bekreft-label')} />
        </div>
        <div className="knapperad">
            <Hovedknapp type="submit" spinner={bekrefter}>Bekreft</Hovedknapp>
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

const Skjemaviser = (props) => {
    const { smSykmelding } = props;
    const ReduxSkjema = reduxForm({
        form: getSykmeldingSkjemanavn(smSykmelding.id),
    })(Skjema);
    return smSykmelding.lestAvBrukerDato
        ? null
        : <ReduxSkjema {...props} />;
};

Skjemaviser.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const mapStateToProps = (state) => {
    return {
        bekrefter: state.smSykmeldinger.bekrefter,
        bekreftFeilet: state.smSykmeldinger.bekreftFeilet,
    };
};

const BekreftLestAvvistSykmeldingSkjema = connect(mapStateToProps, {
    doBekreftSmSykmeldingLest: bekreftSmSykmeldingLest,
})(Skjemaviser);

export default BekreftLestAvvistSykmeldingSkjema;
