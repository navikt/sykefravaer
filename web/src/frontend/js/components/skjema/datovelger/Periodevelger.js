import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, Fields } from 'redux-form';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import DatovelgerPeriode from './DatovelgerPeriode';
import Feilomrade from '../Feilomrade';
import { harOverlappendePerioder } from '../../../utils/periodeUtils';
import { fieldPropTypes, fields as fieldsPt } from '../../../propTypes';

export const Periode = (props) => {
    const { name, index, onRemoveHandler, tidligsteFom, senesteTom, skjemanavn } = props;
    const fomName = `${name}.fom`;
    const tomName = `${name}.tom`;
    return (<Fields
        names={[fomName, tomName]}
        skjemanavn={skjemanavn}
        tidligsteFom={tidligsteFom}
        senesteTom={senesteTom}
        component={DatovelgerPeriode}
        onRemoveHandler={onRemoveHandler}
        periodeIndex={index} />);
};

Periode.propTypes = {
    index: PropTypes.number,
    onRemoveHandler: PropTypes.func,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    name: PropTypes.string.isRequired,
    skjemanavn: PropTypes.string,
};

export class PeriodevelgerComponent extends Component {
    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push({});
        }
    }

    render() {
        const { fields, namePrefix, spoersmal, meta, Overskrift, tidligsteFom, senesteTom,  } = this.props;

        return (<div className="periodevelger">
            <div className={meta && meta.touched && meta.error ? 'blokk' : ''}>
                <Feilomrade {...meta} id={namePrefix}>
                    <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
                    <div className="periodevelger__perioder">
                        {
                            fields.map((field, index) => {
                                return (<Periode
                                    Overskrift={Overskrift}
                                    skjemanavn={meta.form}
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

const PeriodevelgerField = ({ name, spoersmal, tidligsteFom, senesteTom, Overskrift = 'h3' }) => {
    return (<FieldArray
        validate={(value) => {
            return harOverlappendePerioder(value)
                ? 'Du kan ikke legge inn perioder som overlapper med hverandre'
                : undefined;
        }}
        Overskrift={Overskrift}
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
