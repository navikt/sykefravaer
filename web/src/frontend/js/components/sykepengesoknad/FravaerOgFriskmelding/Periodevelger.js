import React, { PropTypes, Component } from 'react';
import { FieldArray } from 'redux-form';
import Datovelger from '../../skjema/Datovelger';
import Feilomrade from '../../skjema/Feilomrade';
import { getLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';

export class Periodevelger extends Component {
    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push({});
        }
    }

    render() {
        const { fields, namePrefix, spoersmal, meta, Overskrift, ledetekster } = this.props;

        return (<div className="periodevelger">
            <div className={meta && meta.touched && meta.error ? 'blokk' : ''}>
                <Feilomrade {...meta}>
                <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
                <div className="periodevelger__perioder">
                    {
                        fields.map((field, index) => {
                            const fomId = `fom-${namePrefix}-${index}`;
                            const tomId = `tom-${namePrefix}-${index}`;
                            return (<div key={index} className="periodevelger__periode">
                                <div className="periodevelger__fom input--s">
                                    <label htmlFor={fomId}>{getLedetekst('sykepengesoknad.periodevelger.fom', ledetekster)}</label>
                                    <Datovelger name={`${namePrefix}[${index}].fom`} id={fomId} />
                                </div>
                                <div className="periodevelger__tom input--s">
                                    <label htmlFor={tomId}>{getLedetekst('sykepengesoknad.periodevelger.tom', ledetekster)}</label>
                                    <Datovelger name={`${namePrefix}[${index}].tom`} id={tomId} />
                                </div>
                                <div className="periodevelger__verktoy">
                                {
                                    index > 0 && <a role="button" href="#" onClick={(e) => {
                                        e.preventDefault();
                                        fields.remove(index);
                                    }}>{getLedetekst('sykepengesoknad.periodevelger.slett', ledetekster)}</a>
                                }
                                </div>
                            </div>);
                        })
                    }
                </div>
                </Feilomrade>
            </div>
            <button className="rammeknapp rammeknapp--mini" onClick={(e) => {
                e.preventDefault();
                fields.push({});
            }}>+ {getLedetekst('sykepengesoknad.periodevelger.legg-til', ledetekster)}</button>
        </div>);
    }
}

Periodevelger.propTypes = {
    fields: PropTypes.array,
    namePrefix: PropTypes.string,
    spoersmal: PropTypes.string,
    meta: PropTypes.object,
    Overskrift: PropTypes.string,
    ledetekster: PropTypes.object,
};

Periodevelger.defaultProps = {
    Overskrift: 'h4',
};

const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
    };
};

const StateConnectedPeriodevelger = connect(mapStateToProps)(Periodevelger);

const PeriodevelgerField = ({ name, spoersmal, ledetekster }) => {
    return <FieldArray component={StateConnectedPeriodevelger} name={name} namePrefix={name} spoersmal={spoersmal} ledetekster={ledetekster} />;
};

PeriodevelgerField.propTypes = {
    name: PropTypes.string,
    spoersmal: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default PeriodevelgerField;
