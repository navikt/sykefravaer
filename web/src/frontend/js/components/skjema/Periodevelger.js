import React, { PropTypes, Component } from 'react';
import { FieldArray } from 'redux-form';
import Datovelger from './Datovelger';
import Feilomrade from './Feilomrade';
import { getLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';

export const Periode = (props) => {
    const { ledetekster, fields, index, onRemoveHandler, tidligsteFom, senesteTom } = props;
    const fomName = `${fields.name}.fom`;
    const tomName = `${fields.name}.tom`;
    return (<div className="periodevelger__periode">
        <div className="periodevelger__fom input--s">
            <label htmlFor={fomName}>{getLedetekst('sykepengesoknad.periodevelger.fom', ledetekster)}</label>
            <Datovelger name={fomName} id={fomName} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
        </div>
        <div className="periodevelger__tom input--s">
            <label htmlFor={tomName}>{getLedetekst('sykepengesoknad.periodevelger.tom', ledetekster)}</label>
            <Datovelger name={tomName} id={tomName} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
        </div>
        <div className="periodevelger__verktoy">
        {
            index > 0 && <a role="button" href="#" onClick={(e) => {
                e.preventDefault();
                onRemoveHandler();
            }}>{getLedetekst('sykepengesoknad.periodevelger.slett', ledetekster)}</a>
        }
        </div>
    </div>);
};

Periode.propTypes = {
    ledetekster: PropTypes.object,
    fields: PropTypes.object,
    index: PropTypes.number,
    onRemoveHandler: PropTypes.func,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

export class Periodevelger extends Component {
    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push({});
        }
    }

    render() {
        const { fields, namePrefix, spoersmal, meta, Overskrift, ledetekster, tidligsteFom, senesteTom } = this.props;

        return (<div className="periodevelger">
            <div className={meta && meta.touched && meta.error ? 'blokk' : ''}>
                <Feilomrade {...meta}>
                    <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
                    <div className="periodevelger__perioder">
                        {
                            fields.map((field, index) => {
                                return (<FieldArray
                                    component={Periode}
                                    name={`${namePrefix}[${index}]`}
                                    ledetekster={ledetekster}
                                    key={index}
                                    index={index}
                                    tidligsteFom={tidligsteFom}
                                    senesteTom={senesteTom}
                                    onRemoveHandler={() => {
                                        fields.remove(index);
                                    }} />);
                            })
                        }
                    </div>
                </Feilomrade>
            </div>
            <button className="rammeknapp rammeknapp--mini" type="button" onClick={(e) => {
                e.preventDefault();
                fields.push({});
            }}>+ {getLedetekst('sykepengesoknad.periodevelger.legg-til', ledetekster)}</button>
        </div>);
    }
}

Periodevelger.propTypes = {
    fields: PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
    namePrefix: PropTypes.string,
    spoersmal: PropTypes.string,
    meta: PropTypes.object,
    Overskrift: PropTypes.string,
    ledetekster: PropTypes.object,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
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

const PeriodevelgerField = ({ name, spoersmal, ledetekster, tidligsteFom, senesteTom }) => {
    return (<FieldArray
        component={StateConnectedPeriodevelger}
        name={name}
        namePrefix={name}
        spoersmal={spoersmal}
        ledetekster={ledetekster}
        tidligsteFom={tidligsteFom}
        senesteTom={senesteTom} />);
};

PeriodevelgerField.propTypes = {
    name: PropTypes.string,
    spoersmal: PropTypes.string,
    ledetekster: PropTypes.object,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

export default PeriodevelgerField;
