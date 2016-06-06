import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBudskap from './TidslinjeBudskap.js';
import { onResizeThrottle, scrollTo } from '../utils';

const StatusIkon = ({ type }) => {
    const status = {
        statusClassName: 'milepael-status-klokke',
        ikonClassName: 'milepael-ikon-klokke',
        ikon: 'klokke-svart.svg',
        alt: '',
    };
    if (type === 'START') {
        status.statusClassName = 'milepael-status-start';
        status.ikonClassName = 'milepael-ikon-start';
        status.ikon = 'hake-hvit.svg';
    }
    return (<div className={`milepael-status ${status.statusClassName}`}>
        <div className={`milepael-ikon ${status.ikonClassName}`}>
            <img src={`/sykefravaer/img/svg/${status.ikon}`} alt={status.alt} />
        </div>
    </div>);
};

StatusIkon.propTypes = {
    type: PropTypes.string,
};

class Milepael extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: this.props.erApen,
            visBudskap: this.props.erApen === true,
            hoyde: this.props.erApen ? 'auto' : '0',
            pilIkon: (this.props.erApen ? 'arrow-up.svg' : 'arrow-down.svg'),
        };

        const that = this;
        onResizeThrottle(() => {
            that.setState({
                hoyde: null,
            });
        });
    }

    setNaavaerendeHoyde() {
        const budskapHoyde = this.refs['js-budskap'].offsetHeight;
        const naaHoyde = !this.state.erApen ? null : budskapHoyde;

        this.setState({
            hoyde: naaHoyde,
        });
    }

    toggle(e) {
        e.preventDefault();
        const blirApen = !this.state.erApen;
        this.setNaavaerendeHoyde();

        if (!this.state.erApen) {
            this.setState({
                visBudskap: true,
            });
        }

        setTimeout(() => {
            const nyHoyde = blirApen ? this.refs['js-budskap'].offsetHeight : 0;
            this.setState({
                hoyde: nyHoyde,
                erApen: blirApen,
                pilIkon: blirApen ? 'arrow-up.svg' : 'arrow-down.svg',
            });
        }, 0);

        setTimeout(() => {
            if (!blirApen) {
                this.setState({
                    visBudskap: false,
                });
            } else {
                scrollTo(this.refs.milepael, 1000);
            }
        }, 300);
    }

    render() {
        return (<article className="milepael" ref="milepael">
            <StatusIkon type={this.props.type} />
                    <div className="milepael-innhold">
                        <div className={`milepael-meta${this.props.type === 'START' ? ' milepael-meta-start' : ''}`}>
                            <h2>{getLedetekst(`${this.props.ledetekst}.meta`, this.props.ledetekster)}</h2>
                        </div>
                        <div className="milepael-boble">
                            <button
                                onClick={(e) => { this.toggle(e); }}
                                aria-pressed={this.state.erApen}
                                className={!this.state.erApen ? 'header-milepael' : 'header-milepael er-apen'}>
                                <h3 className={!this.state.erApen ? 'milepael-tittel milepael-tittel-collapse' : 'milepael-tittel milepael-tittel-collapse er-apen'}>
                                    {getLedetekst(`${this.props.ledetekst}.tittel`, this.props.ledetekster)}
                                </h3>
                            </button>
                            <div
                                aria-hidden={!this.state.erApen}
                                style={this.state.hoyde ? { height: this.state.hoyde } : {}}
                                className={this.state.erApen ? 'milepael-budskap-container er-apen' : 'milepael-budskap-container'}>
                                <div ref="js-budskap">
                                    <TidslinjeBudskap
                                        vis={this.state.visBudskap}
                                        bilde={this.props.bilde}
                                        alt={this.props.alt}
                                        innhold={getLedetekst(`${this.props.ledetekst}.budskap`, this.props.ledetekster)} />
                                </div>
                            </div>
                        </div>
                    </div>
            </article>);
    }
}

Milepael.propTypes = {
    erApen: PropTypes.bool,
    ledetekst: PropTypes.string,
    ledetekster: PropTypes.object,
    bilde: PropTypes.string,
    alt: PropTypes.string,
    type: PropTypes.string,
};

export default Milepael;
