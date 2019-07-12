import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../../propTypes';
import Feilmelding from '../Feilmelding';
import { Vis } from '../../../utils';
import PeriodeDatoinput from './PeriodeDatoinput';
// eslint-disable-next-line import/no-cycle,import/no-cycle
import { PeriodevelgerContext } from './Periodevelger';
// eslint-disable-next-line import/no-cycle
import { onDatoChange } from './PeriodeTom';

class PeriodeTomComponent extends Component {
    componentDidUpdate(prevProps) {
        onDatoChange(this.props, prevProps);
    }

    render() {
        const {
            meta, input, id, kalenderVises, onDoubleClick, onKeyUp,
        } = this.props;

        return (
            <div className="datovelger">
                <div className="datovelger__inner">
                    <div className="datovelger__inputContainer">
                        <PeriodeDatoinput
                            withRef={(c) => {
                                this.input = c;
                            }}
                            meta={meta}
                            id={id}
                            input={input}
                            onKeyUp={onKeyUp}
                            onDoubleClick={onDoubleClick} />
                    </div>
                    <Vis
                        hvis={!kalenderVises}
                        render={() => <Feilmelding {...meta} />} />
                </div>
            </div>
        );
    }
}

PeriodeTomComponent.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    input: fieldPropTypes.input,
    kalenderVises: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    periodeIndex: PropTypes.number,
};

const PeriodeFom = props => (
    <PeriodevelgerContext.Consumer>
        {({ onChange }) => <PeriodeTomComponent {...props} onChange={onChange} />}
    </PeriodevelgerContext.Consumer>
);

export default PeriodeFom;
