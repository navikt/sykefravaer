import React, { Component, PropTypes } from 'react';
import { erGyldigDato, erGyldigDatoformat, parseDato, fraInputdatoTilJSDato } from '../../utils';
import { Field } from 'redux-form';
import Feilmelding from './Feilmelding';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux';
import { autofill } from 'redux-form';
import { SYKEPENGER_SKJEMANAVN } from '../sykepengesoknad/setup';
import { toDatePrettyPrint } from 'digisyfo-npm';
import MaskedInput from 'react-maskedinput';

const MONTHS = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
const WEEKDAYS_LONG = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
const WEEKDAYS_SHORT = ['ma', 'ti', 'on', 'to', 'fr', 'lø', 'sø'];

class Datofelt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
            valgtDato: new Date(),
        };
    }

    onKeyUp(e) {
        if (e.which === 27) {
            // Escape
            this.lukk();
        }
    }

    toggle() {
        if (this.state.erApen) {
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
        this.refs.toggle.focus();
    }

    getDateFromValue () {
        const { input } = this.props;
        const v = input.value;
        if (!erGyldigDatoformat(v) || !erGyldigDato(v)) {
            return undefined;
        }
        else {
            const d = input.value.split('.');
            return new Date(`${d[2]}-${d[1]}-${d[0]}`);            
        }
    }

    getInitialMonth() {
        const s = this.getDateFromValue();
        if (s) {
            return s;
        }
        return new Date();
    }

    render() {
        const { meta, input, id, dispatch } = this.props;
        return (<div>
            <div>
                <MaskedInput
                    type="tel"
                    mask="11.11.1111"
                    autoComplete="off" 
                    placeholder="dd.mm.åååå"
                    id={id}
                    className={`input--dato ${meta.touched && meta.error ? ' input--feil' : ''}`} {...input} />
                <button ref="toggle" 
                    onKeyUp={(e) => {
                        this.onKeyUp(e);
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.toggle();
                    }}
                    aria-pressed={this.erApen}>
                    {this.state.erApen ? "Skjul datovelger" : "Vis datovelger"}
                </button>
            </div>
            { this.state.erApen && <div className="DayPicker__Wrapper" onKeyUp={(e) => {
                this.onKeyUp(e);
            }}>
                <DayPicker
                    ref={(el) => {
                        this.daypicker = el;
                    }}
                    locale="no"
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                    initialMonth={this.getInitialMonth()}
                    selectedDays={(day) => {
                        if (!this.getDateFromValue()) {
                            return false;
                        } else {
                            return DateUtils.isSameDay(this.getDateFromValue(), day)
                        }
                    }}
                    onDayClick={(event, jsDato) => {
                        var s = toDatePrettyPrint(new Date(jsDato));
                        dispatch(autofill(SYKEPENGER_SKJEMANAVN, input.name, s));
                        this.lukk();
                    }}
                />
            </div>}
            <Feilmelding {...meta} />
        </div>);
    }
}

Datofelt.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    mask: PropTypes.string,
};

Datofelt = connect()(Datofelt)

let Datovelger = (props) => {
    return (<Field
        placeholder="dd.mm.åååå"
        component={Datofelt}
        validate={(input) => {
            if (!input) {
                return undefined;
            } else if (!erGyldigDatoformat(input)) {
                return 'Datoen må være på formatet dd.mm.åååå';
            } else if (!erGyldigDato(input)) {
                return 'Datoen er ikke gyldig';
            }
            return undefined;
        }}
        {...props} />);
};

export default Datovelger;
