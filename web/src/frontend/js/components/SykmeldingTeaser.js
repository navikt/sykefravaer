import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

class SykmeldingTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ikon: 'doctor-2.svg',
        };        
    }

    onMouseEnter() {
        this.setState({
            ikon: 'doctor-2_hover.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'doctor-2.svg',
        });
    }

    render() {

        const days = getDuration(this.props.sykmelding.fom, this.props.sykmelding.tom);

        return (<article>
            <Link className="panel sykmelding-teaser" to={getContextRoot() + '/sykmeldinger/' + this.props.sykmelding.id} 
                onMouseEnter={() => {this.onMouseEnter();}}
                onMouseLeave={() => {this.onMouseLeave();}}
            >
            <span className="teaser-ikon">
                <img src={'/sykefravaer/img/svg/' + this.state.ikon} alt="Lege" />
            </span>
            <div className="teaser-innhold">
                <h3 className="js-title teaser-header">
                    <small className="teaser-meta">{getLedetekst('sykmelding.teaser.dato', this.props.ledetekster, {
                        '%FOM%': formatDate(this.props.sykmelding.fom),
                        '%TOM%': formatDate(this.props.sykmelding.tom),
                    })} </small>
                    <span className="teaser-tittel">
                        {getLedetekst('sykmelding.teaser.tittel', this.props.ledetekster)}
                    </span>
                </h3>
                <p className="js-meta typo-infotekst">
                    {getLedetekst('sykmelding.teaser.tekst', this.props.ledetekster, {
                        '%GRAD%': this.props.sykmelding.grad,
                        '%ARBEIDSGIVER%': this.props.sykmelding.arbeidsgiver,
                        '%DAGER%': days,
                    })}
                </p>
            </div>
        </Link></article>);
    }
};

SykmeldingTeaser.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    ledetekster: PropTypes.object,
};

export default SykmeldingTeaser;
