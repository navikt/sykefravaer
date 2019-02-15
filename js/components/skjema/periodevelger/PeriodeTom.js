import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../../propTypes';
import Feilmelding from '../Feilmelding';
import PeriodeDatoinput from './PeriodeDatoinput';
import { Vis } from '../../../utils';

class PeriodeTom extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.erApen && !this.props.erApen) {
            this.toggle.focus();
        }
    }

    render() {
        const { meta, input, id, buttonId, onDoubleClick } = this.props;
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
                    <PeriodeDatoinput meta={meta} id={id} input={input} onDoubleClick={onDoubleClick} />
                    <button
                        type="button"
                        className="js-toggle datovelger__toggleDayPicker"
                        ref={(c) => {
                            this.toggle = c;
                        }}
                        id={buttonId}
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.toggle();
                        }}
                        aria-pressed={this.props.erApen}>
                        {this.props.erApen ? 'Skjul kalender' : 'Vis kalender'}
                    </button>
                </div>
                <Vis
                    hvis={!this.props.erApen}
                    render={() => {
                        return <Feilmelding {...meta} />;
                    }} />
            </div>
        </div>);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

PeriodeTom.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    buttonId: PropTypes.string,
    input: fieldPropTypes.input,
    erApen: PropTypes.bool,
    toggle: PropTypes.func,
    onDoubleClick: PropTypes.func,
};

export default PeriodeTom;
