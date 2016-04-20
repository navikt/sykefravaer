import React, { PropTypes, Component } from 'react';
import { scrollTo } from '../utils';

export class Utvidbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: this.props.erApen,
            ikon: this.props.ikon,
        };
    }

    toggle(e) {
        e.preventDefault();
        const el = this.refs.utvidbar;
        this.setState({
            erApen: !this.state.erApen,
        }, () => {
            if (this.state.erApen) {
                setTimeout(() => {
                    scrollTo(el, 600);
                }, 150);
            }
        });
    }

    onMouseEnter() {
        this.setState({
            ikon: this.props.ikonHover
        })
    }

    onMouseLeave() {
        this.setState({
            ikon: this.props.ikon
        })
    }

    render() {
        return (<div ref="utvidbar" className="utvidbar blokk-l" aria-expanded={this.state.erApen}>
            <h3 className={!this.state.erApen ? 'header-utvidbar' : 'header-utvidbar header-utvidbar-apen'}>
                <a href="javscript:void(0)"
                    role="button"
                    aria-pressed={this.state.erApen}
                    onMouseEnter={() => {this.onMouseEnter();}}
                    onMouseLeave={() => {this.onMouseLeave();}}
                    onClick={(event) => {this.toggle(event);}}>
                        <img src={'/sykefravaer/img/' + this.state.ikon} alt={this.props.ikonAltTekst} className="header-ikon" />
                        <span className="header-tittel">{this.props.tittel}</span>
                </a>
            </h3>
            <div className={!this.state.erApen ?
                        'utvidbar-innhold-beholder utvidbar-innhold-beholder--lukket' :
                        'utvidbar-innhold-beholder'}>
                <div className="utvidbar-innhold">
                    {this.props.children}
                    <div className="knapperad">
                        <a className="lenke-fremhevet" role="button" href="#"
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
    children: PropTypes.array,
    ikon: PropTypes.string,
    ikonHover: PropTypes.string,
    ikonAltTekst: PropTypes.string,
};

Utvidbar.defaultProps = {
    erApen: false,
};

export default Utvidbar;
