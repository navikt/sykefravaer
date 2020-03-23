import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
    scrollTo,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import TidslinjeBudskap from './TidslinjeBudskap';
import HendelseIkon from './HendelseIkon';
import { tidslinjehendelse as hendelsePt } from './tidslinjePropTypes';

export function getHtmlTittel(hendelse, ledetekster) {
    switch (hendelse.type) {
        case 'AKTIVITETSKRAV_VARSEL': {
            return getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster, {
                '%DATO%': tilLesbarDatoMedArstall(hendelse.inntruffetdato),
            });
        }
        case 'NY_NAERMESTE_LEDER': {
            return getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster, {
                '%DATO%': tilLesbarDatoMedArstall(hendelse.inntruffetdato),
                '%ARBEIDSGIVER%': hendelse.data.naermesteLeder.organisasjonsnavn,
                '%NAERMESTELEDER%': hendelse.data.naermesteLeder.navn,
            });
        }
        default:
            return `<h3>${getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster)}</h3>`;
    }
}

export function getHtmlBudskap(hendelse, ledetekster) {
    if (hendelse.type === 'NY_NAERMESTE_LEDER') {
        const aktivTom = tilLesbarDatoMedArstall(hendelse.data.naermesteLeder.aktivTom);
        return getLedetekst(`${hendelse.tekstkey}.budskap`, ledetekster, {
            '%NAVN%': hendelse.data.naermesteLeder.navn,
            '%STATUS%': aktivTom ? `opphørt den ${aktivTom}` : 'aktiv',
        });
    }
    return getLedetekst(`${hendelse.tekstkey}.budskap`, ledetekster);
}

const BobleHeader = ({ clickHandler, erApen, id, htmlTittel }) => {
    return (
        <a
            role="button"
            onClick={(e) => {
                clickHandler(e);
            }}
            aria-pressed={erApen}
            href={`#${id}`}
            className={!erApen ? 'tidslinjeBoble__header' : 'tidslinjeBoble__header tidslinjeBoble__header--erApen'}>
            <div
                className={!erApen ? 'tidslinjeBoble__tittel' : 'tidslinjeBoble__tittel tidslinjeBoble__tittel--erApen'}
                dangerouslySetInnerHTML={{ __html: htmlTittel }}
            />
        </a>
    );
};

BobleHeader.propTypes = {
    clickHandler: PropTypes.func,
    erApen: PropTypes.bool,
    id: PropTypes.string,
    htmlTittel: PropTypes.string,
};

class HendelseBoble extends Component {
    onTransitionEnd() {
        const {
            hendelse,
            setHendelseState,
        } = this.props;
        if (!hendelse.erApen) {
            setHendelseState({
                visBudskap: false,
                medAnimasjon: false,
                hindreToggle: false,
            });
        } else {
            scrollTo(this['boble-header'], 1000);
            setHendelseState({
                medAnimasjon: false,
                hoyde: 'auto',
                hindreToggle: false,
            });
            setTimeout(() => {
                setHendelseState({
                    medAnimasjon: true,
                });
            }, 20);
        }
    }

    getContainerClass() {
        const { hendelse } = this.props;
        let className = hendelse.erApen ? 'tidslinjeBoble__budskapContainer tidslinjeBoble__budskapContainer--erApen' : 'tidslinjeBoble__budskapContainer';
        if (hendelse.medAnimasjon) {
            className = `${className} tidslinjeBoble__budskapContainer--medAnimasjon`;
        }
        return className;
    }

    setNaavaerendeHoyde() {
        const {
            hendelse,
            setHendelseState,
        } = this.props;
        const budskapHoyde = this['js-budskap'].offsetHeight;
        const naaHoyde = !hendelse.erApen ? null : budskapHoyde;

        setHendelseState({
            hoyde: `${naaHoyde}px`,
        });
    }

    apne() {
        const { setHendelseState } = this.props;
        this.setNaavaerendeHoyde();
        setHendelseState({
            visBudskap: true,
            medAnimasjon: true,
            hindreToggle: true,
        });
        setTimeout(() => {
            const nyHoyde = `${this['js-budskap'].offsetHeight}px`;
            setHendelseState({
                hoyde: nyHoyde,
                erApen: true,
            });
        }, 0);
    }

    lukk() {
        const { setHendelseState } = this.props;
        setHendelseState({
            medAnimasjon: true,
            hindreToggle: true,
        });
        this.setNaavaerendeHoyde();
        setTimeout(() => {
            setHendelseState({
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    toggle(e) {
        const { hendelse } = this.props;
        e.preventDefault();
        if (hendelse.erApen && !hendelse.hindreToggle) {
            this.lukk();
        } else if (!hendelse.hindreToggle) {
            this.apne();
        }
    }

    render() {
        const { hendelse, ledetekster } = this.props;

        return (
            <article className="tidslinjeHendelse js-hendelse">
                <div className="tidslinjeHendelse__rad">
                    <div className="tidslinjeHendelse__status">
                        <HendelseIkon type={hendelse.type} />
                    </div>
                    <div
                        className="tidslinjeHendelse__innhold"
                        ref={(c) => {
                            this['boble-header'] = c;
                        }}>
                        <BobleHeader
                            {...hendelse}
                            htmlTittel={getHtmlTittel(hendelse, ledetekster)}
                            clickHandler={(e) => {
                                this.toggle(e);
                            }} />
                    </div>
                </div>
                <div className="tidslinjeHendelse__rad">
                    <div className="tidslinjeHendelse__status" />
                    <div className="tidslinjeHendelse__innhold">
                        <div
                            aria-hidden={!hendelse.erApen}
                            style={hendelse.hoyde ? { height: hendelse.hoyde } : {}}
                            className={this.getContainerClass()}
                            onTransitionEnd={() => {
                                this.onTransitionEnd();
                            }}>
                            <div
                                ref={(c) => {
                                    this['js-budskap'] = c;
                                }}>
                                <TidslinjeBudskap
                                    vis={hendelse.visBudskap}
                                    bilde={hendelse.bilde}
                                    alt={hendelse.alt}
                                    innhold={getHtmlBudskap(hendelse, ledetekster)} />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

HendelseBoble.propTypes = {
    ledetekster: keyValue,
    setHendelseState: PropTypes.func,
    hendelse: hendelsePt,
};

export default HendelseBoble;
