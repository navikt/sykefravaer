import React, { PropTypes, Component } from 'react';
import { scrollTo, erSynligIViewport } from '../utils';

export class Utvidbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            ikon: props.ikon,
            ikonHoykontrast: props.ikon.replace('.svg', '-highcontrast.svg'),
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: this.props.ikonHover,
            ikonHoykontrast: this.props.ikonHover.replace('.svg', '-highcontrast.svg'),
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: this.props.ikon,
            ikonHoykontrast: this.props.ikon.replace('.svg', '-highcontrast.svg'),
        });
    }

    onTransitionEnd() {
        if (this.state.erApen) {
            scrollTo(this.refs.utvidbar, 600);
            this.setState({
                hindreToggle: false,
            });
            this.setAutoHoyde();
        } else {
            this.setState({
                hindreToggle: false,
                visInnhold: false,
            });
            if (!erSynligIViewport(this.refs.utvidbar)) {
                scrollTo(this.refs.utvidbar, 600);
            }
            this.refs['js-toggle'].focus();
        }
    }

    getHeaderClassName() {
        let c = !this.state.erApen ? 'utvidbar__header' : 'utvidbar__header utvidbar__header-erApen';
        if (this.props.variant) {
            c = `${c} utvidbar__header--${this.props.variant}`;
        }
        return c;
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
        tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState({
            containerClassName: '',
        });
        // Setter høyde til auto:
        setTimeout(() => {
            this.setState({
                hoyde: 'auto',
                containerClassName: '',
            });
        }, 0);
    }

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
            containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
            visInnhold: true,
        });
        setTimeout(() => {
            const hoyde = this.refs.innhold.offsetHeight;
            this.setState({
                erApen: true,
                hoyde,
            });
        }, 0);
    }

    lukk() {
        const hoyde = this.refs.innhold.offsetHeight;
        this.setState({
            hoyde,
            hindreToggle: true,
        });
        setTimeout(() => {
            this.setState({
                containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    toggle(e) {
        e.preventDefault();
        if (!this.state.hindreToggle) {
            /* hindreToggle for å hindre dobbelklikk, 
            eller at noen klikker mens animasjonen pågår. 
            Dobbelklikk vil skape kluss med logikken. */
            if (this.state.erApen) {
                this.lukk();
            } else {
                this.apne();
            }
        }
    }

    render() {
        return (<div ref="utvidbar" className={`utvidbar ${this.props.className ? this.props.className : ''}`}>
                <a href="javscript:void(0)"
                    aria-expanded={this.state.erApen}
                    ref="js-toggle"
                    role="button"
                    aria-expanded={this.state.erApen}
                    onMouseEnter={() => {this.onMouseEnter();}}
                    onMouseLeave={() => {this.onMouseLeave();}}
                    onClick={(event) => {this.toggle(event);}}
                    className="utvidbar__toggle">
                    <this.props.Overskrift className={this.getHeaderClassName()}>
                        <img src={`/sykefravaer/img/${this.state.ikon}`} alt={this.props.ikonAltTekst} className="utvidbar__ikon" />
                        <img src={`/sykefravaer/img/${this.state.ikonHoykontrast}`} alt={this.props.ikonAltTekst} className="utvidbar__ikon utvidbar__ikon--hoykontrast" />
                        <span className={!this.state.erApen ? 'utvidbar__tittel' : 'utvidbar__tittel utvidbar__tittel-erApen'}>{this.props.tittel}</span>
                    </this.props.Overskrift>
                </a>
                <div ref="container" style={{ height: this.state.hoyde }} className={`utvidbar__innholdContainer${this.state.containerClassName}`} onTransitionEnd={() => {
                    this.onTransitionEnd();
                }}>
                    <div className="utvidbar__innhold" ref="innhold">
                        {
                            this.state.visInnhold && <div>
                                {this.props.children}
                                <div className="knapperad side-innhold ikke-print">
                                    <button type="button"
                                        className="lenke"
                                        aria-pressed={!this.state.erApen}
                                        tabIndex={this.state.erApen ? null : '-1'}
                                        onClick={(event) => {this.toggle(event);}}>Lukk</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
        </div>);
    }
}

Utvidbar.propTypes = {
    erApen: PropTypes.bool.isRequired,
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    ikon: PropTypes.string,
    ikonHover: PropTypes.string,
    ikonAltTekst: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
};

Utvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export default Utvidbar;
