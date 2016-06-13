import React, { PropTypes, Component } from 'react';
import { scrollTo } from '../utils';

export class Utvidbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: this.props.erApen,
            ikon: this.props.ikon,
            ikonHoykontrast: this.props.ikon.replace('.svg', '-highcontrast.svg'),
            containerClassName: this.props.erApen ? '' : 'utvidbar-innhold-container--lukket',
            hindreToggle: false,
            visInnhold: true,
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

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
        });

        setTimeout(() => {
            const hoyde = this.refs.innhold.offsetHeight;
            this.setState({
                erApen: true,
                hoyde,
            });
        }, 0);

        setTimeout(() => {
            scrollTo(this.refs.utvidbar, 600);
            this.setState({
                hindreToggle: false,
            })
            this.setAutoHoyde(); 
        }, 300);
    }

    lukk() {
        const hoyde = this.refs.innhold.offsetHeight;
        this.setState({
            hoyde,
            hindreToggle: true,
        });
        setTimeout(() => {
            this.setState({
                hoyde: '0',
                erApen: false,
            });
        }, 0);
        setTimeout(() => {
            this.setState({
                hindreToggle: false,
            });
        }, 500);
    }

    setAutoHoyde() {
        this.setState({
            visInnhold: false,
        });
        setTimeout(() => {
            this.setState({
                hoyde: false,
                containerClassName: '',
            });
            setTimeout(() => {
                this.setState({
                    visInnhold: true
                });
            }, 0);
        }, 0); 
    }

    toggle(e) {
        e.preventDefault();
        if (!this.state.hindreToggle) {
            // hindreToggle for å hindre dobbelklikk, eller at noen klikker mens animasjonen pågår. Dobbelklikk vil skape kluss med logikken.
            if (this.state.erApen) {
                this.lukk();
            } else {
                this.apne();
            }
        }
    }

    getStyle() {
        if (this.state.hoyde) {
            return { 
                height: this.state.hoyde,
            }
        } 
        return {};
    }

    render() {
        return (<div ref="utvidbar" className={`utvidbar blokk-l ${this.props.className ? this.props.className : ''}`} aria-expanded={this.state.erApen}>
                <a href="javscript:void(0)"
                    role="button"
                    aria-pressed={this.state.erApen}
                    onMouseEnter={() => {this.onMouseEnter();}}
                    onMouseLeave={() => {this.onMouseLeave();}}
                    onClick={(event) => {this.toggle(event);}}
                    className="utvidbar-toggle">
                    <this.props.Overskrift className={!this.state.erApen ? 'utvidbar-header' : 'utvidbar-header utvidbar-header-apen'}>
                        <img src={`/sykefravaer/img/${this.state.ikon}`} alt={this.props.ikonAltTekst} className="header-ikon" />
                        <img src={`/sykefravaer/img/${this.state.ikonHoykontrast}`} alt={this.props.ikonAltTekst} className="header-ikon header-ikon-hoykontrast" />
                        <span className="header-tittel">TEST 1</span>
                    </this.props.Overskrift>
                </a>
                {
                    !this.state.visInnhold ? null :
                    <div ref="container" style={this.getStyle()} className={`utvidbar-innhold-container ${this.state.containerClassName}`}>
                        <div className="utvidbar-innhold" ref="innhold">
                            {this.props.children}
                            <div className="knapperad side-innhold">
                                <a role="button" href="#"
                                    aria-pressed={!this.state.erApen}
                                    tabIndex={this.state.erApen ? '' : '-1'}
                                    onClick={(event) => {this.toggle(event);}}>Lukk</a>
                            </div>
                        </div>
                    </div>
                }
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
};

Utvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export default Utvidbar;
