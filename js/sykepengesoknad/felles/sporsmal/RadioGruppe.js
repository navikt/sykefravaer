import React from 'react';
import { connect } from 'react-redux';
import { Field, autofill as autofillAction } from 'redux-form';
import { Radio } from 'nav-frontend-skjema';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import cn from 'classnames';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import Sporsmalstekst from './Sporsmalstekst';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import { hentSkjemaVerdier } from '../../../selectors/reduxFormSelectors';
import { CHECKED } from '../../../enums/svarEnums';
import Undersporsmalsliste from './Undersporsmalsliste';
import { BETALER_ARBEIDSGIVER } from '../../../enums/tagtyper';
import Feilomrade from '../../../components/skjema/Feilomrade';
import { fieldPropTypes, sporsmal as sporsmalPt, soknad as soknadPt, svartypePt } from '../../../propTypes/index';
import { RADIO_GRUPPE_TIMER_PROSENT } from '../../../enums/svartyper';

const tagMatcher = (tags, inputTag) => {
    return tags.filter((tag) => {
        return inputTag.indexOf(tag) > -1;
    }).length > 0;
};

const skalViseInfotekst = (tag) => {
    return tagMatcher([
        BETALER_ARBEIDSGIVER,
    ], tag);
};

const Infotekst = ({ tag, sist }) => {
    const nokkel = `soknad.infotekst.${tag.toLowerCase()}.infotekst`;
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
    sist: PropTypes.bool,
};

export const erHorisontal = (svartype) => {
    return svartype === RADIO_GRUPPE_TIMER_PROSENT;
};

const Radioknapp = ({ input, label, children }) => {
    const checked = input.value === label;
    return (<div>
        <Radio {...input} label={label} value={label} checked={checked} />
        { checked && children }
    </div>);
};

Radioknapp.propTypes = {
    input: fieldPropTypes.input,
    label: PropTypes.string,
    children: PropTypes.node,
};

const RadiogruppeComponent = ({ meta, tag, sporsmalstekst, svartype, undersporsmal, autofill, soknad, verdi }) => {
    const sporsmalMedUndersporsmal = undersporsmal.find((s) => {
        return s.sporsmalstekst === verdi;
    });
    return (<Feilomrade {...meta}>
        <Sporsmalstekst tekst={sporsmalstekst} />
        <div className={erHorisontal(svartype) ? 'inputgruppe inputgruppe--horisontal' : 'inputgruppe'}>
            {
                undersporsmal.map((sporsmal, index) => {
                    return (<Field
                        component={Radioknapp}
                        key={sporsmal.sporsmalstekst}
                        label={sporsmal.sporsmalstekst}
                        name={tag}
                        onChange={() => {
                            undersporsmal.forEach((_underspm) => {
                                const value = _underspm.tag === sporsmal.tag ? CHECKED : '';
                                autofill(getSkjemanavnFraSoknad(soknad), _underspm.tag, genererParseForEnkeltverdi()(value));
                            });
                        }}
                        parse={genererParseForEnkeltverdi()}
                        format={formaterEnkeltverdi}>
                        <Infotekst
                            tag={sporsmal.tag}
                            sist={index + 1 === undersporsmal.length} />
                    </Field>);
                })
            }
        </div>
        {
            sporsmalMedUndersporsmal && <Undersporsmalsliste soknad={soknad} undersporsmal={sporsmalMedUndersporsmal.undersporsmal} />
        }
    </Feilomrade>);
};

RadiogruppeComponent.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    tag: PropTypes.string,
    sporsmalstekst: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    autofill: PropTypes.func,
    soknad: soknadPt,
    verdi: PropTypes.string,
    svartype: svartypePt,
};

const RadioGruppe = (props) => {
    return (<Field name={props.tag} component={RadiogruppeComponent} {...props} />);
};

RadioGruppe.propTypes = {
    tag: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    const verdier = hentSkjemaVerdier(state, getSkjemanavnFraSoknad(ownProps.soknad));

    return {
        verdi: formaterEnkeltverdi(verdier[ownProps.tag]),
    };
};

export default connect(mapStateToProps, { autofill: autofillAction })(RadioGruppe);
