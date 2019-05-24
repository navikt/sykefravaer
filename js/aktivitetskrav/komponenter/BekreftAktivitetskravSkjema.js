import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLedetekst, keyValue } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import CheckboxSelvstendig from '../../components/skjema/CheckboxSelvstendig';
import { bekreftAktivitetskrav } from '../data/aktivitetskrav/aktivitetskravActions';
import Feilstripe from '../../components/Feilstripe';
import { selectLedeteksterData } from '../../data/ledetekster/ledeteksterSelectors';

const Aktivitetskrav = (props) => {
    const { handleSubmit, ledetekster, dispatch, bekrefter, bekreftFeilet } = props;
    return (<form onSubmit={handleSubmit(() => {
        dispatch(bekreftAktivitetskrav());
    })}>
        <Feilstripe vis={bekreftFeilet} className="blokk" />
        <div className="bekreftAktivitetskrav">
            <Field
                name="bekreftAktivitetskrav"
                component={CheckboxSelvstendig}
                id="bekreftAktivitetskrav"
                label={getLedetekst('aktivitetskrav-varsel.bekreft-label', ledetekster)} />
        </div>
        <div className="knapperad">
            <button type="submit" className={`knapp${bekrefter ? ' knapp--spinner' : ''}`}>
                Bekreft
                { bekrefter && <span className="knapp__spinner" /> }
            </button>
        </div>
    </form>);
};

Aktivitetskrav.propTypes = {
    handleSubmit: PropTypes.func,
    ledetekster: keyValue,
    dispatch: PropTypes.func,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
};

const validate = (values) => {
    if (!values.bekreftAktivitetskrav) {
        return {
            bekreftAktivitetskrav: 'Du må bekrefte at du har lest all informasjonen du har fått',
        };
    }
    return {};
};

const form = reduxForm({
    form: 'BEKREFT_AKTIVITETSKRAV',
    validate,
})(Aktivitetskrav);

const mapStateToProps = (state) => {
    return {
        ledetekster: selectLedeteksterData(state),
        bekrefter: state.aktivitetskrav.bekrefter,
        bekreftFeilet: state.aktivitetskrav.bekreftFeilet,
    };
};

const connectedForm = connect(mapStateToProps, { actions: { bekreftAktivitetskrav } })(form);

export default connectedForm;
