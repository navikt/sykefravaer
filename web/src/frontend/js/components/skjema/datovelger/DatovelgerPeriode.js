import React, { Component } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Vis } from '../../../utils';
import { validerDatoField } from './validering';
import DayPickerPeriode from './DayPickerPeriode';
import FomField from './PeriodeFom';
import TomField from './PeriodeTom';

let lukk;

class Periodevelger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
        };
        this.toggle = this.toggle.bind(this);
        this.lukk = this.lukk.bind(this);
        this.apne = this.apne.bind(this);
        this.validerDatoField = this.validerDatoField.bind(this);
    }

    componentDidMount() {
        lukk = (event) => {
            const kalendere = document.getElementsByClassName('js-periodekalender');
            for (let i = 0; i < kalendere.length; i += 1) {
                if (!kalendere[i].contains(event.target)) {
                    this.lukk();
                }
            }
        };
        document.addEventListener('click', lukk);
    }

    componentWillUnmount() {
        document.removeEventListener('click', lukk);
    }


    toggle() {
        this.setState({
            erApen: !this.state.erApen,
        });
    }

    lukk() {
        this.setState({
            erApen: false,
        });
    }

    apne() {
        this.setState({
            erApen: true,
        });
    }

    handleKeyUp(e) {
        const ESCAPE_KEYCODE = 27;
        if (e.which === ESCAPE_KEYCODE) {
            this.lukk();
        }
    }

    validerDatoField(input) {
        return validerDatoField(input, {
            fra: this.props.tidligsteFom,
            til: this.props.senesteTom,
        });
    }

    render() {
        const { names, periodeIndex } = this.props;
        const buttonId = `toggle-${names[1].split('.')[0]}`;
        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="periodevelger__periode" onKeyUp={this.handleKeyUp}>
                <div className="periodevelger__datoer">
                    <div className="periodevelger__fom">
                        <label htmlFor={names[0]}>{getLedetekst('sykepengesoknad.periodevelger.fom')}</label>
                        <Field
                            periodeIndex={periodeIndex}
                            component={FomField}
                            name={names[0]}
                            id={names[0]}
                            onDoubleClick={this.apne}
                            validate={this.validerDatoField}
                            kalenderVises={this.state.erApen} />
                    </div>
                    <div className="periodevelger__skille">–</div>
                    <div className="periodevelger__tom">
                        <label htmlFor={names[1]}>{getLedetekst('sykepengesoknad.periodevelger.tom')}</label>
                        <Field
                            component={TomField}
                            name={names[1]}
                            id={names[1]}
                            buttonId={buttonId}
                            toggle={this.toggle}
                            onDoubleClick={this.apne}
                            validate={this.validerDatoField}
                            erApen={this.state.erApen} />
                    </div>
                </div>
                <Vis hvis={this.state.erApen}>
                    <DayPickerPeriode {...this.props} lukk={this.lukk} ariaControlledBy={buttonId} />
                </Vis>
                <Vis hvis={periodeIndex !== 0}>
                    <div className="periodevelger__verktoy">
                        <button
                            type="button"
                            className="lenke"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.onRemoveHandler();
                            }}>{getLedetekst('sykepengesoknad.periodevelger.slett')}</button>
                    </div>
                </Vis>
            </div>);
        /* eslint-disable jsx-a11y/no-static-element-interactions */
    }
}

Periodevelger.propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    visVerktoy: PropTypes.bool,
    onRemoveHandler: PropTypes.func,
    skjemanavn: PropTypes.string,
    periodeIndex: PropTypes.number,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

export default Periodevelger;

