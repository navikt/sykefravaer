/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst } from '../../../digisyfoNpm';
import { Vis } from '../../../utils';
import validerDatoField from '../datovelger/validerDatoField';
import DayPickerPeriode from './DayPickerPeriode';
// TODO: Fiks sykliske dependencies
// eslint-disable-next-line import/no-cycle
import FomFieldComponent from './PeriodeFom';
// eslint-disable-next-line import/no-cycle,import/no-cycle
import PeriodeTomComponent from './PeriodeTom';
// eslint-disable-next-line import/no-cycle
import { PeriodevelgerContext } from './Periodevelger';

let lukk;

class PeriodevelgerInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
        };
        this.toggle = this.toggle.bind(this);
        this.lukk = this.lukk.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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
        this.setState(prevState => ({
            erApen: !prevState.erApen,
        }));
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
        const { tidligsteFom, senesteTom } = this.props;
        return validerDatoField(input, {
            fra: tidligsteFom,
            til: senesteTom,
        });
    }

    render() {
        const { names, periodeIndex, onRemoveHandler } = this.props;
        const { erApen } = this.state;
        const buttonId = `toggle-${names[1].split('.')[0]}`;
        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="periodevelger__periode" onKeyUp={this.handleKeyUp}>
                <div className="periodevelger__datoer">
                    <div className="periodevelger__fom">
                        <label className="skjemaelement__label" htmlFor={names[0]}>{getLedetekst('sykepengesoknad.periodevelger.fom')}</label>
                        <Field
                            component={FomFieldComponent}
                            periodeIndex={periodeIndex}
                            name={names[0]}
                            id={names[0]}
                            onDoubleClick={this.apne}
                            onKeyUp={this.lukk}
                            validate={this.validerDatoField}
                            kalenderVises={erApen} />
                    </div>
                    <div className="periodevelger__skille">–</div>
                    <div className="periodevelger__tom">
                        <label className="skjemaelement__label" htmlFor={names[1]}>{getLedetekst('sykepengesoknad.periodevelger.tom')}</label>
                        <Field
                            component={PeriodeTomComponent}
                            name={names[1]}
                            id={names[1]}
                            buttonId={buttonId}
                            toggle={this.toggle}
                            onDoubleClick={this.apne}
                            onKeyUp={this.lukk}
                            validate={this.validerDatoField}
                            erApen={erApen} />
                    </div>
                </div>
                <Vis
                    hvis={erApen}
                    render={() => (
                        <DayPickerPeriode
                            {...this.props}
                            lukk={this.lukk}
                            ariaControlledBy={buttonId} />
                    )} />
                <Vis
                    hvis={periodeIndex !== 0}
                    render={() => (
                        <div className="periodevelger__verktoy">
                            <button
                                type="button"
                                className="lenke"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onRemoveHandler();
                                }}>
                                {getLedetekst('sykepengesoknad.periodevelger.slett')}
                            </button>
                        </div>
                    )} />
            </div>
        );
        /* eslint-disable jsx-a11y/no-static-element-interactions */
    }
}

PeriodevelgerInputComponent.propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    visVerktoy: PropTypes.bool,
    onRemoveHandler: PropTypes.func,
    skjemanavn: PropTypes.string,
    periodeIndex: PropTypes.number,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

const PeriodevelgerInput = props => (
    <PeriodevelgerContext.Consumer>
        {
            contextProps => <PeriodevelgerInputComponent {...props} {...contextProps} />
        }
    </PeriodevelgerContext.Consumer>
);

export default PeriodevelgerInput;
