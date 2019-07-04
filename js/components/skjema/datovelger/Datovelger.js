import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Field, change, touch, formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import { toDatePrettyPrint } from '@navikt/digisyfo-npm';
import cn from 'classnames';
import MaskedInput from 'react-maskedinput';
import Feilmelding from '../Feilmelding';
import DayPickerComponent from './DayPickerDato';
import validerDatoField from './validerDatoField';
import { fieldPropTypes } from '../../../propTypes';

export class DatoField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { input, oppdaterSporsmal, inputValue } = this.props;
        const currentValue = input.value;
        const forrigeValue = prevProps.input.value;
        if (currentValue !== forrigeValue && oppdaterSporsmal) {
            oppdaterSporsmal(null, inputValue);
        }
    }

    onKeyUp(e) {
        const ESCAPE_KEYCODE = 27;
        if (e.which === ESCAPE_KEYCODE) {
            this.lukk();
        }
    }

    toggleApen() {
        const { erApen } = this.state;
        if (erApen) {
            this.lukk();
        } else {
            this.apne();
        }
    }

    apne() {
        this.setState({
            erApen: true,
        });
    }

    lukk() {
        this.setState({
            erApen: false,
        });
        if (this.toggle) {
            this.toggle.focus();
        }
    }

    parseVerdi(jsDato) {
        const { parseVerdi } = this.props;
        const verdi = toDatePrettyPrint(new Date(jsDato));
        return !parseVerdi
            ? verdi
            : parseVerdi(verdi);
    }

    render() {
        const {
            meta, input, id, tidligsteFom, senesteTom, doChange, doTouch,
        } = this.props;
        const { erApen } = this.state;
        const classNameMaskedInput = cn('skjemaelement__input  datovelger__input', {
            'skjemaelement__input--harFeil': meta.touched && meta.error,
        });
        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        return (
            <div className="datovelger">
                <div
                    className="datovelger__inner"
                    onClick={(event) => {
                        try {
                            event.nativeEvent.stopImmediatePropagation();
                        } catch (e) {
                            event.stopPropagation();
                        }
                    }}>
                    <div className="datovelger__inputContainer">
                        <MaskedInput
                            type="tel"
                            mask="11.11.1111"
                            autoComplete="off"
                            placeholder="dd.mm.åååå"
                            id={id}
                            onKeyUp={() => {
                                this.setState({
                                    erApen: false,
                                });
                            }}
                            className={classNameMaskedInput}
                            {...input} />
                        <button
                            type="button"
                            className="js-toggle datovelger__toggleDayPicker"
                            ref={(c) => {
                                this.toggle = c;
                            }}
                            id={`toggle-${id}`}
                            onKeyUp={(e) => {
                                this.onKeyUp(e);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                this.toggleApen();
                            }}
                            aria-pressed={erApen}>
                            {erApen ? 'Skjul datovelger' : 'Vis datovelger'}
                        </button>
                    </div>
                    {
                        erApen
                        && (
                            <DayPickerComponent
                                {...this.props}
                                erApen={erApen}
                                tidligsteFom={tidligsteFom}
                                senesteTom={senesteTom}
                                onDayClick={(event, jsDato) => {
                                    const verdi = this.parseVerdi(jsDato);
                                    doChange(meta.form, input.name, verdi);
                                    doTouch(meta.form, input.name);
                                    this.lukk();
                                }}
                                onKeyUp={(e) => {
                                    this.onKeyUp(e);
                                }}
                                lukk={() => {
                                    this.lukk();
                                }} />
                        )
                    }
                    <Feilmelding {...meta} />
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

DatoField.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    input: fieldPropTypes.input,
    doTouch: PropTypes.func.isRequired,
    doChange: PropTypes.func.isRequired,
    oppdaterSporsmal: PropTypes.func,
    parseVerdi: PropTypes.func,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    inputValue: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
};

const mapStateToProps = (state, ownProps) => {
    const inputName = ownProps.input.name;
    const skjemanavn = ownProps.meta.form;
    const selector = formValueSelector(skjemanavn);
    const inputValue = selector(state, inputName);
    return {
        inputValue,
    };
};

const ConnectedDatoField = connect(mapStateToProps, { doChange: change, doTouch: touch })(DatoField);

export const genererValidate = (props) => {
    return (verdi) => {
        const formatertVerdi = props.format
            ? props.format(verdi)
            : verdi;
        return validerDatoField(formatertVerdi, {
            fra: props.tidligsteFom,
            til: props.senesteTom,
        });
    };
};

const Datovelger = (props) => {
    const validate = genererValidate(props);
    return (
        <Field
            component={ConnectedDatoField}
            validate={validate}
            {...props} />
    );
};

Datovelger.propTypes = {
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    validate: PropTypes.func,
};

export default Datovelger;
