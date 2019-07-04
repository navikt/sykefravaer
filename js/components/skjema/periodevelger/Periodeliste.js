/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Feilomrade from '../Feilomrade';
import { fieldPropTypes, fields as fieldsPt } from '../../../propTypes';
// eslint-disable-next-line import/no-cycle
import PeriodeFields from './PeriodeFields';

export class PeriodelisteComponent extends Component {
    componentWillMount() {
        const { fields } = this.props;
        if (fields.length === 0) {
            fields.push({});
        }
    }

    componentDidUpdate(prevProps) {
        const { fields, onAddRemove, namePrefix } = this.props;
        if (fields.length !== prevProps.fields.length
            && typeof onAddRemove === 'function') {
            onAddRemove(namePrefix, fields.getAll());
        }
    }

    render() {
        const {
            fields, namePrefix, spoersmal, meta, Overskrift,
        } = this.props;

        return (
            <div className="periodevelger">
                <div className={meta && meta.touched && meta.error ? 'blokk' : ''}>
                    <Feilomrade {...meta} id={namePrefix}>
                        <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
                        <div className="periodevelger__perioder">
                            {
                                fields.map((field, index) => (
                                    <PeriodeFields
                                        Overskrift={Overskrift}
                                        skjemanavn={meta.form}
                                        name={`${namePrefix}[${index}]`}
                                        key={index}
                                        index={index}
                                        onRemoveHandler={() => {
                                            fields.remove(index);
                                        }} />
                                ))
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
                    }}>
+
                    {getLedetekst('sykepengesoknad.periodevelger.legg-til-ekstra')}
                </button>
            </div>
        );
    }
}

PeriodelisteComponent.propTypes = {
    fields: fieldsPt,
    namePrefix: PropTypes.string,
    spoersmal: PropTypes.string,
    meta: fieldPropTypes.meta,
    Overskrift: PropTypes.string,
    onChange: PropTypes.func,
    onAddRemove: PropTypes.func,
};

PeriodelisteComponent.defaultProps = {
    Overskrift: 'h4',
};

const Periodeliste = connect()(PeriodelisteComponent);

export default Periodeliste;
