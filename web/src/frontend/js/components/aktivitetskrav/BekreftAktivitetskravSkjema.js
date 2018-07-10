import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import CheckboxSelvstendig from '../skjema/CheckboxSelvstendig';
import { bekreftAktivitetskrav } from '../../actions/aktivitetskrav_actions';

const Aktivitetskrav = (props) => {
    const { handleSubmit, ledetekster, dispatch, bekrefter, bekreftFeilet } = props;
    return (<form onSubmit={handleSubmit(() => {
        dispatch(bekreftAktivitetskrav());
    })}>
        <div role="alert" aria-live="polite">
            { bekreftFeilet && (
                <Alertstripe type="advarsel" className="blokk">
                    <p className="sist">Beklager! Det oppstod en feil! Prøv igjen litt senere.</p>
                </Alertstripe>)
            }
        </div>
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
        ledetekster: state.ledetekster.data,
        bekrefter: state.aktivitetskrav.bekrefter,
        bekreftFeilet: state.aktivitetskrav.bekreftFeilet,
    };
};

const connectedForm = connect(mapStateToProps, { actions: { bekreftAktivitetskrav } })(form);

export default connectedForm;
