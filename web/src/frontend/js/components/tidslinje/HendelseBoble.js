import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../../ledetekster';
import TidslinjeBudskap from './TidslinjeBudskap';
import HendelseIkon from './HendelseIkon';
import { scrollTo } from '../../utils';
import { toDatePrettyPrint } from '../../utils/datoUtils';

export function getHtmlTittel(hendelse, ledetekster) {
    switch (hendelse.type) {
        case 'AKTIVITETSKRAV_VARSEL': {
            return getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster, {
                '%DATO%': toDatePrettyPrint(hendelse.inntruffetdato),
            });
        }
        case 'NY_NAERMESTE_LEDER': {
            return getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster, {
                '%DATO%': toDatePrettyPrint(hendelse.inntruffetdato),
                '%ARBEIDSGIVER%': 'Din arbeidsgiver',
                '%NAERMESTELEDER%': hendelse.data.naermesteLeder.navn,
            });
        }
        default:
            return `<h3>${getLedetekst(`${hendelse.tekstkey}.tittel`, ledetekster)}</h3>`;
    }
}

const BobleHeader = (props) => {
    return (<a
        role="button"
        onClick={(e) => {
            props.clickHandler(e);
        }}
        aria-pressed={props.erApen}
        href={`#${props.id}`}
        className={!props.erApen ? 'tidslinjeBoble__header' : 'tidslinjeBoble__header tidslinjeBoble__header--erApen'}>
        <div
            className={!props.erApen ? 'tidslinjeBoble__tittel' : 'tidslinjeBoble__tittel tidslinjeBoble__tittel--erApen'}
            dangerouslySetInnerHTML={{ __html: props.htmlTittel }}>
        </div>
    </a>);
};

BobleHeader.propTypes = {
    clickHandler: PropTypes.func,
    erApen: PropTypes.bool,
    id: PropTypes.string,
    htmlTittel: PropTypes.string,
};

class HendelseBoble extends Component {

    onTransitionEnd() {
        if (!this.props.hendelse.erApen) {
            this.props.setHendelseState({
                visBudskap: false,
                medAnimasjon: false,
                hindreToggle: false,
            });
        } else {
            scrollTo(this.refs['boble-header'], 1000);
            this.props.setHendelseState({
                medAnimasjon: false,
                hoyde: 'auto',
                hindreToggle: false,
            });
            setTimeout(() => {
                this.props.setHendelseState({
                    medAnimasjon: true,
                });
            }, 20);
        }
    }

    getContainerClass() {
        let className = this.props.hendelse.erApen ? 'tidslinjeBoble__budskapContainer tidslinjeBoble__budskapContainer--erApen' : 'tidslinjeBoble__budskapContainer';
        if (this.props.hendelse.medAnimasjon) {
            className = `${className} tidslinjeBoble__budskapContainer--medAnimasjon`;
        }
        return className;
    }

    setNaavaerendeHoyde() {
        const budskapHoyde = this.refs['js-budskap'].offsetHeight;
        const naaHoyde = !this.props.hendelse.erApen ? null : budskapHoyde;

        this.props.setHendelseState({
            hoyde: `${naaHoyde}px`,
        });
    }

    apne() {
        this.setNaavaerendeHoyde();
        this.props.setHendelseState({
            visBudskap: true,
            medAnimasjon: true,
            hindreToggle: true,
        });
        setTimeout(() => {
            const nyHoyde = `${this.refs['js-budskap'].offsetHeight}px`;
            this.props.setHendelseState({
                hoyde: nyHoyde,
                erApen: true,
            });
        }, 0);
    }

    lukk() {
        this.props.setHendelseState({
            medAnimasjon: true,
            hindreToggle: true,
        });
        this.setNaavaerendeHoyde();
        setTimeout(() => {
            this.props.setHendelseState({
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    toggle(e) {
        e.preventDefault();
        if (this.props.hendelse.erApen && !this.props.hendelse.hindreToggle) {
            this.lukk();
        } else if (!this.props.hendelse.hindreToggle) {
            this.apne();
        }
    }

    render() {
        return (<article className="tidslinjeHendelse js-hendelse">
            <div className="tidslinjeHendelse__rad">
                <div className="tidslinjeHendelse__status">
                    <HendelseIkon type={this.props.hendelse.type}/>
                </div>
                <div className="tidslinjeHendelse__innhold" ref="boble-header">
                    <BobleHeader {...this.props.hendelse}
                                 htmlTittel={getHtmlTittel(this.props.hendelse, this.props.ledetekster)}
                                 clickHandler={(e) => {
                                     this.toggle(e);
                                 }}/>
                </div>
            </div>
            <div className="tidslinjeHendelse__rad">
                <div className="tidslinjeHendelse__status"/>
                <div className="tidslinjeHendelse__innhold">
                    <div
                        aria-hidden={!this.props.hendelse.erApen}
                        style={this.props.hendelse.hoyde ? { height: this.props.hendelse.hoyde } : {}}
                        className={this.getContainerClass()}
                        onTransitionEnd={() => {
                            this.onTransitionEnd();
                        }}>
                        <div ref="js-budskap">
                            <TidslinjeBudskap
                                vis={this.props.hendelse.visBudskap}
                                bilde={this.props.hendelse.bilde}
                                alt={this.props.hendelse.alt}
                                innhold={getLedetekst(`${this.props.hendelse.tekstkey}.budskap`, this.props.ledetekster)}/>
                        </div>
                    </div>
                </div>
            </div>
        </article>);
    }
}

HendelseBoble.propTypes = {
    ledetekster: PropTypes.object,
    setHendelseState: PropTypes.func,
    hendelse: PropTypes.shape({
        antallDager: PropTypes.number,
        bilde: PropTypes.string,
        data: PropTypes.object,
        id: PropTypes.string,
        inntruffetdato: PropTypes.date,
        tekstkey: PropTypes.string,
        type: PropTypes.string,
        erApen: PropTypes.bool,
        medAnimasjon: PropTypes.bool,
        hindreToggle: PropTypes.bool,
        hoyde: PropTypes.number,
        visBudskap: PropTypes.bool,
        alt: PropTypes.number,
    }),
};

export default HendelseBoble;
