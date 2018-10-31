import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import cn from 'classnames';
import Radioknapper from '../skjema/Radioknapper';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import Undersporsmalsliste from './Undersporsmalsliste';
import { getOnChange } from '../../utils/soknad-felles/getOnChange';
import { fieldPropTypes, sporsmal as sporsmalPt, svaralternativer as svaralternativerPt } from '../../propTypes';
import { BETALER_ARBEIDSGIVER, HVOR_MYE_HAR_DU_JOBBET } from '../../enums/tagtyper';

const tagMatcher = (tags, inputTag) => {
    return tags.filter((tag) => {
        return inputTag.indexOf(tag) > -1;
    }).length > 0;
};

const skalViseInfotekst = (tag) => {
    return tagMatcher([
        BETALER_ARBEIDSGIVER
    ], tag);
};

const Infotekst = ({ tag, verdi, sist }) => {
    const nokkel = `soknad.infotekst.${tag.toLowerCase()}.${verdi.toLowerCase()}`;
    const classNames = cn('ekstrasporsmal', {
        'ekstrasporsmal--sist': sist,
    });

    return skalViseInfotekst(tag)
        ? (<div className={classNames}>
            <p className="sist">{getLedetekst(nokkel)}</p>
        </div>)
        : null;
};

Infotekst.propTypes = {
    tag: PropTypes.string,
    verdi: PropTypes.string,
    sist: PropTypes.bool,
}

export const erHorisontal = (tag) => {
    return tagMatcher([
        HVOR_MYE_HAR_DU_JOBBET
    ], tag);
};

const RadiogruppeComponent = ({ input, meta, sporsmalstekst, undersporsmal, svaralternativer, id, tag }) => {
    return (<div>
        <Radioknapper input={input} meta={meta} spoersmal={sporsmalstekst} horisontal={erHorisontal(tag)}>
            {
                svaralternativer.map((svaralternativ, index) => {
                    return (<i
                        key={`${svaralternativ.verdi}_${id}`}
                        label={svaralternativ.svartekst}
                        value={svaralternativ.verdi}>
                        <Infotekst
                            tag={tag}
                            verdi={svaralternativ.verdi}
                            sist={index + 1 === svaralternativer.length} />
                    </i>);
                })
            }
        </Radioknapper>
        <Undersporsmalsliste undersporsmal={undersporsmal} parentValue={input.value} />
    </div>);
};

RadiogruppeComponent.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    sporsmalstekst: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    svaralternativer: svaralternativerPt,
    id: PropTypes.string,
    tag: PropTypes.string,
};

const RadioGruppe = (props) => {
    const { id } = props;
    const parse = genererParseForEnkeltverdi(id);
    return (<Field
        onChange={getOnChange(props)}
        parse={parse}
        format={formaterEnkeltverdi}
        component={RadiogruppeComponent}
        {...props} />);
};

RadioGruppe.propTypes = {
    id: PropTypes.string,
};

export default RadioGruppe;
