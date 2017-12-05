import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlLedetekst, getLedetekst, Radiofaner, Utvidbar } from 'digisyfo-npm';
import { Link } from 'react-router';

const teksterMedArbeidsgiver = [{
    fom: 0,
    tom: 16,
    nokkel: 'tidslinje.utdrag.sykmeldt-hva-naa.med-arbeidsgiver',
    bilde: 'sykmeldt-hva-naa.svg',
}, {
    fom: 17,
    tom: 28,
    nokkel: 'tidslinje.utdrag.snakk-med-arbeidsgiver',
    bilde: 'snakk-med-arbeidsgiver.svg',
}, {
    fom: 29,
    tom: 42,
    nokkel: 'tidslinje.utdrag.dialogmote-arbeidsgiver',
    bilde: 'dialogmote-med-arbeidsgiver.svg',
}, {
    fom: 43,
    tom: 56,
    nokkel: 'tidslinje.utdrag.aktivitetskrav-med-arbeidsgiver',
    bilde: 'aktivitetsplikt.svg',
}, {
    fom: 57,
    tom: 182,
    nokkel: 'tidslinje.utdrag.dialogmote-nav.med-arbeidsgiver',
    bilde: 'dialogmote-med-nav.svg',
}, {
    fom: 183,
    tom: 273,
    nokkel: 'tidslinje.utdrag.langtidssykmeldt-med-arbeidsgiver',
    bilde: 'langtidssykmeldt.svg',
}, {
    fom: 274,
    tom: 500,
    nokkel: 'tidslinje.utdrag.sluttfasen.med-arbeidsgiver',
    bilde: 'sluttfasen.svg',
}];

const teksterUtenArbeidsgiver = [{
    fom: 0,
    tom: 16,
    nokkel: 'tidslinje.utdrag.sykmeldt-hva-naa.uten-arbeidsgiver',
    bilde: 'sykmeldt-hva-naa.svg',
}, {
    fom: 17,
    tom: 56,
    nokkel: 'tidslinje.utdrag.mulighet-for-aktivitet-uten-arbeidsgiver',
    bilde: 'vurdert-aktivitet.svg',
}, {
    fom: 57,
    tom: 84,
    nokkel: 'tidslinje.utdrag.snakk-med-nav',
    bilde: 'dialogmote-med-nav.svg',
}, {
    fom: 85,
    tom: 273,
    nokkel: 'tidslinje.utdrag.aktivitetsplan-uten-arbeidsgiver',
    bilde: 'aktivitetsplan.svg',
}, {
    fom: 274,
    tom: 500,
    nokkel: 'tidslinje.utdrag.sluttfasen.uten-arbeidsgiver',
    bilde: 'sluttfasen.svg',
}];

export const MED_ARBEIDSGIVER = 'MED_ARBEIDSGIVER';
export const UTEN_ARBEIDSGIVER = 'UTEN_ARBEIDSGIVER';
export const VALGFRI = 'VALGFRI';

const tekster = {};
tekster[MED_ARBEIDSGIVER] = teksterMedArbeidsgiver;
tekster[UTEN_ARBEIDSGIVER] = teksterUtenArbeidsgiver;

const TittelIngress = ({ nokkelbase, bilde }) => {
    return (<div className="tidslinjeutdrag">
        <img className="tidslinjeutdrag__bilde" src={`/sykefravaer/img/tidslinjeutdrag/${bilde}`} alt="" />
        <div className="tidslinjeutdrag__intro">
            <h2 className="tidslinjeutdrag__tittel">{getLedetekst(`${nokkelbase}.tittel`)}</h2>
            <div
                className="tidslinjeutdrag__ingress redaksjonelt-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst(`${nokkelbase}.ingress`)} />
        </div>
    </div>);
};

TittelIngress.propTypes = {
    nokkelbase: PropTypes.string,
    bilde: PropTypes.string,
};

export const VelgArbeidssituasjon = (props) => {
    return (<Radiofaner
        {...props}
        className="radiofaner__valg--tidslinjeutdrag"
        radioName="tidslinjeutdragvisning"
        alternativer={[{
            verdi: MED_ARBEIDSGIVER,
            tittel: 'Jeg har arbeidsgiver',
        }, {
            verdi: UTEN_ARBEIDSGIVER,
            tittel: 'Jeg har ikke arbeidsgiver',
        }]}
    />);
};

export default class TidslinjeUtdrag extends Utvidbar {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            ikon: props.ikon,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
            harTransisjon: false,
            visning: props.visning === VALGFRI ? MED_ARBEIDSGIVER : props.visning,
        };
    }

    onTransitionEnd() {
        if (this.state.harTransisjon) {
            this.setState({
                harTransisjon: false,
            });
            if (this.state.erApen) {
                this.setState({
                    hindreToggle: false,
                });
                this.setAutoHoyde();
            } else {
                this.setState({
                    hindreToggle: false,
                    visInnhold: false,
                });
                this['js-toggle'].focus();
            }
        }
    }

    getTekstObjekt() {
        const { antallDager } = this.props;
        return tekster[this.state.visning].filter((t) => {
            return t.fom <= antallDager && t.tom >= antallDager;
        })[0];
    }

    getNokkelbase() {
        return this.getTekstObjekt().nokkel;
    }

    getBilde() {
        return this.getTekstObjekt().bilde;
    }

    render() {
        const { visning, antallDager } = this.props;
        if (antallDager > 500) {
            return null;
        }
        const nokkelbase = this.getNokkelbase();
        return (<article
            aria-expanded={this.state.erApen}
            className="panel landingspanel"
            ref={(c) => {
                this.utvidbar = c;
            }}>
            {
                visning === VALGFRI && <VelgArbeidssituasjon
                    valgtAlternativ={this.state.visning}
                    changeHandler={(_visning) => {
                        this.setState({
                            visning: _visning,
                        });
                    }} />
            }
            <TittelIngress nokkelbase={nokkelbase} bilde={this.getBilde()} />
            <div
                style={{ height: this.state.hoyde }}
                className={`utvidbar__innholdContainer${this.state.containerClassName}`}
                onTransitionEnd={() => {
                    this.onTransitionEnd();
                }}
                ref={(c) => {
                    this.container = c;
                }}>
                <div
                    ref={(c) => {
                        this.innhold = c;
                    }}>
                    {
                        this.state.visInnhold && (<div>
                            <div className="redaksjonelt-innhold blokk" dangerouslySetInnerHTML={getHtmlLedetekst(`${nokkelbase}.mer`)} />
                            <p className="blokk"><Link className="lenkeTilTidslinje" to="/sykefravaer/tidslinjen">{getLedetekst('tidslinje.utdrag.lenke-til-tidslinje')}</Link></p>
                        </div>)
                    }
                </div>
            </div>
            <div className="tidslinjeutdrag__toggle">
                <button
                    aria-pressed={this.state.erApen}
                    ref={(c) => {
                        this['js-toggle'] = c;
                    }}
                    onClick={(e) => {
                        this.toggle(e);
                    }}
                    className={`tidslinjeutdrag__togglelink ${this.state.erApen ? 'tidslinjeutdrag__togglelink--erApen' : ''}`}>{this.state.erApen ? 'Lukk' : 'Åpne'}</button>
            </div>
        </article>);
    }
}
