import React, { PropTypes, Component } from 'react';
import TidslinjeBudskap from './TidslinjeBudskap';
import HendelseIkon from './HendelseIkon';
import { scrollTo, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';

const BobleHeader = (props) => {
    return (<a
        role="button"
        onClick={(e) => { props.clickHandler(e); }}
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
        if (!this.props.erApen) {
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
        let className = this.props.erApen ? 'tidslinjeBoble__budskapContainer tidslinjeBoble__budskapContainer--erApen' : 'tidslinjeBoble__budskapContainer';
        if (this.props.medAnimasjon) {
            className = `${className} tidslinjeBoble__budskapContainer--medAnimasjon`;
        }
        return className;
    }

    getHtmlTittel() {
        if (this.props.type === 'AKTIVITETSKRAV_VARSEL') {
            return getLedetekst(`${this.props.tekstkey}.tittel`, this.props.ledetekster, {
                '%DATO%': toDatePrettyPrint(this.props.inntruffetdato),
            });
        }
        return `<h3>${getLedetekst(`${this.props.tekstkey}.tittel`, this.props.ledetekster)}</h3>`;
    }

    setNaavaerendeHoyde() {
        const budskapHoyde = this.refs['js-budskap'].offsetHeight;
        const naaHoyde = !this.props.erApen ? null : budskapHoyde;

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
        if (this.props.erApen && !this.props.hindreToggle) {
            this.lukk();
        } else if (!this.props.hindreToggle) {
            this.apne();
        }
    }

    render() {
        return (<article className="tidslinjeHendelse js-hendelse">
                <div className="tidslinjeHendelse__rad">
                    <div className="tidslinjeHendelse__status">
                        <HendelseIkon type={this.props.type} />
                    </div>
                    <div className="tidslinjeHendelse__innhold" ref="boble-header">
                        <BobleHeader {...this.props}
                            htmlTittel={this.getHtmlTittel()}
                            clickHandler={(e) => {
                                this.toggle(e);
                            }} />
                    </div>
                </div>
                <div className="tidslinjeHendelse__rad">
                    <div className="tidslinjeHendelse__status" />
                    <div className="tidslinjeHendelse__innhold">
                        <div
                            aria-hidden={!this.props.erApen}
                            style={this.props.hoyde ? { height: this.props.hoyde } : {}}
                            className={this.getContainerClass()}
                            onTransitionEnd={() => {
                                this.onTransitionEnd();
                            }}>
                            <div ref="js-budskap">
                                <TidslinjeBudskap
                                    vis={this.props.visBudskap}
                                    bilde={this.props.bilde}
                                    alt={this.props.alt}
                                    innhold={getLedetekst(`${this.props.tekstkey}.budskap`, this.props.ledetekster)} />
                            </div>
                        </div>
                    </div>
                </div>
        </article>);
    }
}

HendelseBoble.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    bilde: PropTypes.string,
    alt: PropTypes.string,
    setHendelseState: PropTypes.func,
    hoyde: PropTypes.string,
    visBudskap: PropTypes.bool,
    medAnimasjon: PropTypes.bool,
    hindreToggle: PropTypes.bool,
    id: PropTypes.string,
    tekstkey: PropTypes.string,
    type: PropTypes.string,
    inntruffetdato: PropTypes.object,
};

export default HendelseBoble;
