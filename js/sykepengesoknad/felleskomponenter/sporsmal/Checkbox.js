import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Checkboks from '../../../components/skjema/Checkbox';
import { fieldPropTypes, sporsmal as sporsmalPt, soknadPt } from '../../../propTypes/index';
import Undersporsmal from './Undersporsmal';
import { formaterEnkeltverdi, genererParseForCheckbox } from './fieldUtils';
import { getOnChange } from '../../utils/getOnChange';

const rendreCheckbox = (props) => {
    return (<Checkboks {...props} />);
};

rendreCheckbox.propTypes = {
    meta: fieldPropTypes.meta,
};

const Checkbox = (props) => {
    const { sporsmalstekst, undersporsmal, name, renderComponent = rendreCheckbox, soknad, id } = props;
    const parse = genererParseForCheckbox(id);
    return (<Field
        onChange={getOnChange(props)}
        parse={parse}
        format={formaterEnkeltverdi}
        component={renderComponent}
        name={name}
        label={sporsmalstekst}
        id={name}>
        {
            undersporsmal.map((spm, index) => {
                return <Undersporsmal sporsmal={spm} key={`${spm.tag}-${index}`} soknad={soknad} />;
            })
        }
    </Field>);
};

Checkbox.propTypes = {
    sporsmalstekst: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    name: PropTypes.string,
    renderComponent: PropTypes.func,
    soknad: soknadPt.isRequired,
    id: PropTypes.string,
};

export default Checkbox;
