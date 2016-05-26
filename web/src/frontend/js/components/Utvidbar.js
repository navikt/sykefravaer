import React, { PropTypes, Component } from 'react';
import { scrollTo } from '../utils';

export class Utvidbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: this.props.erApen,
            ikon: this.props.ikon,
            ikonHoykontrast: this.props.ikon.replace('.svg', '-highcontrast.svg'),
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

    toggle(e) {
        e.preventDefault();
        const el = this.refs.utvidbar;
        this.setState({
            erApen: !this.state.erApen,
        }, () => {
            setTimeout(() => {
                scrollTo(el, 600);
            }, 150);
        });
    }

    render() {
        return (<div ref="utvidbar" className={`utvidbar blokk-l ${this.props.className}`} aria-expanded={this.state.erApen}>
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
                        <span className="header-tittel">{this.props.tittel}</span>
                    </this.props.Overskrift>
                </a>
            <div className={!this.state.erApen ?
                        'utvidbar-innhold-beholder utvidbar-innhold-beholder--lukket' :
                        'utvidbar-innhold-beholder'}>
                <div className="utvidbar-innhold">
                    {this.props.children}
                    <div className="knapperad side-innhold">
                        <a role="button" href="#"
                            aria-pressed={!this.state.erApen}
                            tabIndex={this.state.erApen ? '' : '-1'}
                            onClick={(event) => {this.toggle(event);}}>Lukk</a>
                    </div>
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
};

Utvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export default Utvidbar;
