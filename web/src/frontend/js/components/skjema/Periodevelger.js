import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Datovelger from './Datovelger';
import Feilomrade from './Feilomrade';
import { harOverlappendePerioder } from '../../utils/periodeUtils';
import { fieldPropTypes, fields as fieldsPt } from '../../propTypes';

export const Periode = (props) => {
    const { name, index, onRemoveHandler, tidligsteFom, senesteTom } = props;
    const fomName = `${name}.fom`;
    const tomName = `${name}.tom`;
    return (<div className="periodevelger__periode">
        <div className="periodevelger__fom input--s">
            <label htmlFor={fomName}>{getLedetekst('sykepengesoknad.periodevelger.fom')}</label>
            <Datovelger name={fomName} id={fomName} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
        </div>
        <div className="periodevelger__tom input--s">
            <label htmlFor={tomName}>{getLedetekst('sykepengesoknad.periodevelger.tom')}</label>
            <Datovelger name={tomName} id={tomName} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
        </div>
        <div className="periodevelger__verktoy">
            {
                index > 0 && <a
                    role="button"
                    className="lenke"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemoveHandler();
                    }}>{getLedetekst('sykepengesoknad.periodevelger.slett')}</a>
            }
        </div>
    </div>);
};

Periode.propTypes = {
    index: PropTypes.number,
    onRemoveHandler: PropTypes.func,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    name: PropTypes.string.isRequired,
};

export class PeriodevelgerComponent extends Component {
    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push({});
        }
    }

    render() {
        const { fields, namePrefix, spoersmal, meta, Overskrift, tidligsteFom, senesteTom } = this.props;

        return (<div className="periodevelger">
            <div className={meta && meta.touched && meta.error ? 'blokk' : ''}>
                <Feilomrade {...meta} id={namePrefix}>
                    <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
                    <div className="periodevelger__perioder">
                        {
                            fields.map((field, index) => {
                                return (<Periode
                                    name={`${namePrefix}[${index}]`}
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
            <button
                className="lenke"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    fields.push({});
                }}>+ {getLedetekst('sykepengesoknad.periodevelger.legg-til-ekstra')}</button>
        </div>);
    }
}

PeriodevelgerComponent.propTypes = {
    fields: fieldsPt,
    namePrefix: PropTypes.string,
    spoersmal: PropTypes.string,
    meta: fieldPropTypes.meta,
    Overskrift: PropTypes.string,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

PeriodevelgerComponent.defaultProps = {
    Overskrift: 'h4',
};

export const StateConnectedPeriodevelger = connect()(PeriodevelgerComponent);

const PeriodevelgerField = ({ name, spoersmal, tidligsteFom, senesteTom }) => {
    return (<FieldArray
        validate={(value) => {
            if (harOverlappendePerioder(value)) {
                return 'Du kan ikke legge inn perioder som overlapper med hverandre';
            }
            return undefined;
        }}
        component={StateConnectedPeriodevelger}
        name={name}
        namePrefix={name}
        spoersmal={spoersmal}
        tidligsteFom={tidligsteFom}
        senesteTom={senesteTom} />);
};

PeriodevelgerField.propTypes = {
    name: PropTypes.string,
    spoersmal: PropTypes.string,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

export default PeriodevelgerField;
