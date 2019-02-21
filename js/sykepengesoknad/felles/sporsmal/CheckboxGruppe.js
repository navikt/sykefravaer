import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import Sporsmalstekst from './Sporsmalstekst';
import Feilomrade from '../../../components/skjema/Feilomrade';
import Checkbox from './Checkbox';
import { sporsmal as sporsmalPt, fieldPropTypes, soknad as soknadPt } from '../../../propTypes/index';
import Undertekst from './Undertekst';

const rendreCheckboxGruppe = ({ fields, meta, soknad, actions }) => {
    return (<Feilomrade {...meta}>
        {
            fields.map((field) => {
                return <Checkbox {...field} name={field.tag} key={field.tag} soknad={soknad} actions={actions} />;
            })
        }
    </Feilomrade>);
};

rendreCheckboxGruppe.propTypes = {
    fields: PropTypes.arrayOf(sporsmalPt),
    meta: fieldPropTypes.meta,
    soknad: soknadPt.isRequired,
    actions: PropTypes.shape({
        soknadEndret: PropTypes.func,
    }),
};

const CheckboxGruppe = ({ sporsmalstekst, undertekst, name, undersporsmal, soknad, actions }) => {
    return (<div>
        <Sporsmalstekst tekst={sporsmalstekst} />
        <Undertekst tekst={undertekst} />
        <FieldArray component={rendreCheckboxGruppe} name={name} fields={undersporsmal} soknad={soknad} actions={actions} />
    </div>);
};

CheckboxGruppe.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    undertekst: PropTypes.string,
    soknad: soknadPt.isRequired,
    actions: PropTypes.shape({
        soknadEndret: PropTypes.func,
    }),
};

export default CheckboxGruppe;
