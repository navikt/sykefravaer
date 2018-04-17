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
    }

    componentDidMount() {
        lukk = (event) => {
            if (!event.target.closest('.js-periodekalender')) {
                this.lukk();
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

    render() {
        const { names, visVerktoy } = this.props;

        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="periodevelger__periode" onKeyUp={this.handleKeyUp}>
                <div className="periodevelger__datoer">
                    <div className="periodevelger__fom">
                        <label htmlFor={names[0]}>{getLedetekst('sykepengesoknad.periodevelger.fom')}</label>
                        <Field
                            component={FomField}
                            name={names[0]}
                            id={names[0]}
                            onDoubleClick={this.apne}
                            validate={validerDatoField}
                            kalenderVises={this.state.erApen} />
                    </div>
                    <div className="periodevelger__skille">–</div>
                    <div className="periodevelger__tom">
                        <label htmlFor={names[1]}>{getLedetekst('sykepengesoknad.periodevelger.tom')}</label>
                        <Field
                            component={TomField}
                            name={names[1]}
                            id={names[1]}
                            toggle={this.toggle}
                            onDoubleClick={this.apne}
                            validate={validerDatoField}
                            erApen={this.state.erApen} />
                    </div>
                </div>
                <Vis hvis={this.state.erApen}>
                    <DayPickerPeriode {...this.props} lukk={this.lukk} />
                </Vis>
                <Vis hvis={visVerktoy}>
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
};

Periodevelger.defaultProps = {
    Overskrift: 'h3',
};

export default Periodevelger;

