import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../../propTypes';
import Feilmelding from '../Feilmelding';
import { Vis } from '../../../utils';
import PeriodeDatoinput from './PeriodeDatoinput';

class FomField extends Component {
    componentDidMount() {
        if (this.props.periodeIndex !== 0) {
            this.input.focus();
        }
    }

    render() {
        const { meta, input, id, kalenderVises, onDoubleClick } = this.props;

        return (<div className="datovelger">
            <div className="datovelger__inner">
                <div className="datovelger__inputContainer">
                    <PeriodeDatoinput
                        withRef={(c) => {
                            this.input = c;
                        }}
                        meta={meta}
                        id={id}
                        input={input}
                        onDoubleClick={onDoubleClick} />
                </div>
                <Vis
                    hvis={!kalenderVises}
                    render={() => {
                        return <Feilmelding {...meta} />;
                    }} />
            </div>
        </div>);
    }
}

FomField.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    input: fieldPropTypes.input,
    kalenderVises: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    periodeIndex: PropTypes.number,
};

export default FomField;
