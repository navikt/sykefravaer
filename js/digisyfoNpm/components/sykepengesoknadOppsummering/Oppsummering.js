import React from 'react';
import PropTypes from 'prop-types';
import { CHECKBOX, DATO, DATOSPENN, HTML, RADIOKNAPPER, TEKSTSVAR } from '../../enums/sykepengesoknadsvartyper';
import {
    oppsummeringsoknad as oppsummeringsoknadPt,
    sykepengesoknadoppsummeringsporsmal as sykepengesoknadoppsummeringsporsmalPt,
    sykepengesoknadoppsummeringsvar,
    sykepengesoknadoppsummeringtilleggstekst as tilleggstekstPt,
} from '../../propTypes';
import {
    aktiviteterType,
    ansvarBekreftetType,
    arbeidsgiverForskuttererType,
    egenmeldingsdagerType,
    feriePermisjonUtenlandsoppholdType,
    gjenopptattArbeidFulltUtType,
    inntektskilderType,
    utdanningType,
} from '../../enums/sporsmalstyper';

const Avkrysset = ({ tekst }) => {
    return (
        <div className="oppsummering__avkrysset">
            <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
            <span>{tekst}</span>
        </div>
    );
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

const Svar = ({ children, klasser, tilleggstekst, sporsmalsliste, index }) => {
    return (
        <div className={klasser} key={index}>
            {children}
            <Tilleggstekst tilleggstekst={tilleggstekst} />
            {sporsmalsliste}
        </div>
    );
};

Svar.propTypes = {
    children: PropTypes.element,
    klasser: PropTypes.string,
    tilleggstekst: tilleggstekstPt,
    sporsmalsliste: PropTypes.element,
    index: PropTypes.number,
};

const Svarliste = ({ svarliste = [], overskriftsnivaa }) => {
    return svarliste.map((svar, index) => {
        const sporsmalsliste = (
            <Undersporsmalsliste
                undersporsmalsliste={svar.undersporsmal}
                overskriftsnivaa={overskriftsnivaa} />
        );
        switch (svar.type) {
            case CHECKBOX:
            case RADIOKNAPPER: {
                return (
                    <Svar
                        key={index}
                        klasser="oppsummering__svarliste"
                        tilleggstekst={svar.tilleggstekst}
                        sporsmalsliste={sporsmalsliste}
                        index={index}>
                        <Avkrysset key={index} tekst={svar.ledetekst.tekst} />
                    </Svar>
                );
            }
            case TEKSTSVAR: {
                return (
                    <Svar
                        key={index}
                        klasser="oppsummering__tekstsvar"
                        tilleggstekst={svar.tilleggstekst}
                        sporsmalsliste={sporsmalsliste}
                        index={index}>
                        <p key={index} className="oppsummering__tekst">{svar.ledetekst.tekst}</p>
                    </Svar>
                );
            }
            case DATO:
            case DATOSPENN: {
                return (
                    <Svar
                        key={index}
                        klasser="oppsummering__tekstsvar"
                        tilleggstekst={svar.tilleggstekst}
                        sporsmalsliste={sporsmalsliste}
                        index={index}>
                        <p key={index} className="oppsummering__dato">{svar.ledetekst.tekst}</p>
                    </Svar>
                );
            }
            default: {
                return null;
            }
        }
    });
};

Svarliste.propTypes = {
    svarliste: PropTypes.arrayOf(sykepengesoknadoppsummeringsvar),
    overskriftsnivaa: PropTypes.number,
};

const Undersporsmalsliste = ({ undersporsmalsliste, overskriftsnivaa }) => {
    if (!undersporsmalsliste || undersporsmalsliste.length === 0) {
        return null;
    }
    if (undersporsmalsliste.length === 1 && !undersporsmalsliste[0].ledetekst) {
        return <Svarliste svarliste={undersporsmalsliste[0].svar} overskriftsnivaa={overskriftsnivaa} />;
    }
    return (
        <div className="oppsummering__undersporsmalsliste">
            {
                undersporsmalsliste.map((sporsmal, i) => {
                    return <Sporsmal sporsmal={sporsmal} key={i} overskriftsnivaa={overskriftsnivaa} />;
                })
            }
        </div>
    );
};

Undersporsmalsliste.propTypes = {
    undersporsmalsliste: PropTypes.arrayOf(sykepengesoknadoppsummeringsporsmalPt),
    overskriftsnivaa: PropTypes.number,
};

export const getSporsmalid = (type, index) => {
    if (!type) {
        return null;
    }

    const sporsmalstypeMap = {
        [ansvarBekreftetType]: 'ansvarBekreftet',
        [egenmeldingsdagerType]: 'egenmeldingsdager',
        [gjenopptattArbeidFulltUtType]: 'gjenopptattArbeidFulltUt',
        [feriePermisjonUtenlandsoppholdType]: 'feriePermisjonUtenlandsopphold',
        [aktiviteterType]: 'aktiviteter',
        [inntektskilderType]: 'inntektskilder',
        [utdanningType]: 'utdanning',
        [arbeidsgiverForskuttererType]: 'arbeidsgiverForskutterer',
    };

    const typetekst = sporsmalstypeMap[type];
    return type === aktiviteterType ? `${typetekst}-${index}-sporsmal` : `${typetekst}-sporsmal`;
};

export const Sporsmal = ({ sporsmal, overskriftsnivaa = 1, index }) => {
    const Overskriftstag = `h${overskriftsnivaa}`;
    if (sporsmal.ledetekst) {
        return (
            <div className="oppsummering__sporsmalscontainer" id={getSporsmalid(sporsmal.type, index)}>
                <Overskriftstag className="oppsummering__sporsmal">{sporsmal.ledetekst.tekst}</Overskriftstag>
                <Svarliste svarliste={sporsmal.svar} overskriftsnivaa={overskriftsnivaa + 1} />
            </div>
        );
    }
    return <Svarliste svarliste={sporsmal.svar} />;
};

Sporsmal.propTypes = {
    sporsmal: sykepengesoknadoppsummeringsporsmalPt,
    overskriftsnivaa: PropTypes.number,
    index: PropTypes.number,
};

export const Tilleggstekst = ({ tilleggstekst, stylingklasser }) => {
    if (tilleggstekst) {
        switch (tilleggstekst.type) {
            case HTML:
                return (
                    <div
                        className={stylingklasser}
                        dangerouslySetInnerHTML={{ __html: tilleggstekst.ledetekst.tekst }} />
                );
            default:
                return null;
        }
    }
    return null;
};

Tilleggstekst.propTypes = {
    tilleggstekst: tilleggstekstPt,
    stylingklasser: PropTypes.string,
};

Tilleggstekst.defaultProps = {
    stylingklasser: '',
};

const SoknadOppsummering = ({ oppsummeringsoknad }) => {
    return (
        <div className="oppsummering__seksjoner">
            {
                oppsummeringsoknad.soknad.map((hovedsporsmal, i) => {
                    return (
                        <div className="oppsummering__seksjon" key={`seksjon-${i}`}>
                            <Sporsmal sporsmal={hovedsporsmal} overskriftsnivaa={3} index={i} />
                        </div>
                    );
                })
            }
        </div>
    );
};

SoknadOppsummering.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};

export default SoknadOppsummering;
