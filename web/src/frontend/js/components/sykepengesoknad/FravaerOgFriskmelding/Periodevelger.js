import React, { PropTypes, Component } from 'react';
import { FieldArray } from 'redux-form';
import Datovelger from '../../skjema/Datovelger';
import Feilomrade from '../../skjema/Feilomrade';

export class Periodevelger extends Component {
    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push({});
        }
    }

    render() {
        const { fields, namePrefix, spoersmal, meta, Overskrift } = this.props;
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
                                    <label htmlFor={fomId}>Fra dato</label>
                                    <Datovelger name={`${namePrefix}[${index}].fom`} id={fomId} />
                                </div>
                                <div className="periodevelger__tom input--s">
                                    <label htmlFor={tomId}>Til dato</label>
                                    <Datovelger name={`${namePrefix}[${index}].tom`} id={tomId} />
                                </div>
                                <div className="periodevelger__verktoy">
                                {
                                    index > 0 && <a role="button" href="#" onClick={(e) => {
                                        e.preventDefault();
                                        fields.remove(index);
                                    }}>Slett periode</a>
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
            }}>+ Legg til periode</button>
        </div>);
    }
}

Periodevelger.propTypes = {
    fields: PropTypes.array,
    namePrefix: PropTypes.string,
    spoersmal: PropTypes.string,
    meta: PropTypes.object,
    Overskrift: PropTypes.string,
};

Periodevelger.defaultProps = {
    Overskrift: 'h4',
};

const PeriodevelgerField = ({ name, spoersmal }) => {
    return <FieldArray component={Periodevelger} name={name} namePrefix={name} spoersmal={spoersmal} />;
};

PeriodevelgerField.propTypes = {
    name: PropTypes.string,
    spoersmal: PropTypes.string,
};

export default PeriodevelgerField;
