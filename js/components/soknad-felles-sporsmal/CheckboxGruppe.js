import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import Sporsmalstekst from './Sporsmalstekst';
import Feilomrade from '../skjema/Feilomrade';
import Checkbox from './Checkbox';
import { sporsmal as sporsmalPt, fieldPropTypes, soknad as soknadPt } from '../../propTypes';
import Undertekst from './Undertekst';

const rendreCheckboxGruppe = ({ fields, meta, soknad }) => {
    return (<Feilomrade {...meta}>
        {
            fields.map((field) => {
                return <Checkbox {...field} name={field.tag} key={field.tag} soknad={soknad} />;
            })
        }
    </Feilomrade>);
};

rendreCheckboxGruppe.propTypes = {
    fields: PropTypes.arrayOf(sporsmalPt),
    meta: fieldPropTypes.meta,
    soknad: soknadPt.isRequired,
};

const CheckboxGruppe = ({ sporsmalstekst, undertekst, name, undersporsmal, soknad }) => {
    return (<div>
        <Sporsmalstekst tekst={sporsmalstekst} />
        <Undertekst tekst={undertekst} />
        <FieldArray component={rendreCheckboxGruppe} name={name} fields={undersporsmal} soknad={soknad} />
    </div>);
};

CheckboxGruppe.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    undertekst: PropTypes.string,
    soknad: soknadPt.isRequired,
};

export default CheckboxGruppe;
