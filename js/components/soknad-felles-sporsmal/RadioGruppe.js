import React from 'react';
import { Field } from 'redux-form';
import Radioknapper from '../skjema/Radioknapper';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import Undersporsmalsliste from './Undersporsmalsliste';
import { getOnChange } from '../../utils/soknad-felles/getOnChange';

const RadiogruppeComponent = ({ input, meta, sporsmalstekst, undersporsmal, svaralternativer, kriterieForVisningAvUndersporsmal, id }) => {
    return (<div>
        <Radioknapper input={input} meta={meta} spoersmal={sporsmalstekst} horisontal>
            {
                svaralternativer.map((svaralternativ) => {
                    return (<i
                        key={`${svaralternativ.verdi}_${id}`}
                        label={svaralternativ.svartekst}
                        value={svaralternativ.verdi} />);
                })
            }
        </Radioknapper>
        {
            input.value === kriterieForVisningAvUndersporsmal
                && <Undersporsmalsliste undersporsmal={undersporsmal} />
        }
    </div>);
};

const RadioGruppe = (props) => {
    const { name, id } = props;
    const parse = genererParseForEnkeltverdi(id);
    return (<Field
        onChange={getOnChange(props)}
        name={name}
        parse={parse}
        format={formaterEnkeltverdi}
        component={RadiogruppeComponent}
        {...props} />);
};

export default RadioGruppe;
