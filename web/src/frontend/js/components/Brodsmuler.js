import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';

const Brodsmule = ({ sti, tittel }) => {
    return (<span>
        <Link className="js-smule" to={getContextRoot() + sti}>{tittel}</Link>
        <span className="brodsmule-skille"> / </span>
    </span>);
};

Brodsmule.propTypes = {
    sti: PropTypes.string,
    tittel: PropTypes.string,
};

const ToggleLink = ({ onClick }) => {
    return (<span>
        <a className="js-toggle" href="#" onClick={onClick}>...</a>
        <span className="brodsmule-skille"> / </span>
    </span>);
};

ToggleLink.propTypes = {
    onClick: PropTypes.func,
};

class Brodsmuler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visCollapsed: true,
        };
    }

    getMiniBrodsmuler() {
        const { brodsmuler } = this.props;
        if (this.visCollapsed()) {
            return [
                brodsmuler[brodsmuler.length - 2],
                brodsmuler[brodsmuler.length - 1],
            ];
        }
        return brodsmuler;
    }

    visCollapsed() {
        return this.props.brodsmuler.length > 3 && this.state.visCollapsed;
    }

    visAlleBrodsmuler() {
        this.setState({
            visCollapsed: false,
        });
    }

    render() {
        const { brodsmuler } = this.props;
        const miniBrodsmuler = this.getMiniBrodsmuler();
        return (<nav role="navigation" className="brodsmuler blokk side-innhold" aria-label="Du er her: ">
            <img src="/sykefravaer/img/svg/person.svg" alt="Du" className="brodsmuler-ikon" />
            <img src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" className="brodsmuler-ikon brodsmuler-ikon-hoykontrast" />
            <a href="/dittnav" className="js-smule">Ditt NAV</a>
            {brodsmuler.length ? <span className="brodsmule-skille"> / </span> : ''}
            {this.visCollapsed() ? <ToggleLink onClick={(e) => {
                e.preventDefault();
                this.visAlleBrodsmuler();
            }} /> : null}
            {miniBrodsmuler.map((smule, idx) => {
                if (miniBrodsmuler.length === idx + 1) {
                    return (<span key={idx} className="js-smuletekst">
                        <span className="vekk">Du er her:</span> {smule.tittel}
                    </span>);
                } else if (smule.erKlikkbar) {
                    return (<Brodsmule key={idx} sti={smule.sti} tittel={smule.tittel} />);
                }
                return (<span key={idx}>
                    {smule.tittel}
                    <span className="brodsmule-skille"> / </span>
                </span>);
            })}
        </nav>);
    }
}

Brodsmuler.propTypes = {
    brodsmuler: PropTypes.array,
};

export default Brodsmuler;
