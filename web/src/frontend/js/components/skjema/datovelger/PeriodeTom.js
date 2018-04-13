import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../../propTypes';
import Feilmelding from '../Feilmelding';
import { Datoinput } from './PeriodeFom';
import { Vis } from '../../../utils';

class TomField extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.erApen && !this.props.erApen) {
            this.toggle.focus();
        }
    }

    render() {
        const { meta, input, id, toggle, onDoubleClick } = this.props;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (<div className="datovelger">    
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
                    <Datoinput meta={meta} id={id} input={input} onDoubleClick={onDoubleClick} />
                    <button
                        className="js-toggle datovelger__toggleDayPicker"
                        ref={(c) => {
                            this.toggle = c;
                        }}
                        id={`toggle-${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggle();
                        }}
                        aria-pressed={this.props.erApen}>
                        {this.props.erApen ? 'Skjul kalender' : 'Vis kalender'}
                    </button>
                </div>
                <Vis hvis={!this.props.erApen}> 
                    <Feilmelding {...meta} />
                </Vis>
            </div>
        </div>);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

TomField.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    input: fieldPropTypes.input,
    erApen: PropTypes.bool,
    toggle: PropTypes.func,
    onDoubleClick: PropTypes.func,
};

export default TomField;
