import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

const PeriodeListe = ({ perioder, arbeidsgiver, ledetekster }) => {
    return (<ul className="teaser-punktliste">
        {perioder.map((periode, index) => {
            return (<li key={index}>{getLedetekst('sykmelding.teaser.tekst', ledetekster, {
                '%GRAD%': periode.grad,
                '%ARBEIDSGIVER%': arbeidsgiver,
                '%DAGER%': getDuration(periode.fom, periode.tom),
            })}</li>);
        })}
    </ul>);
};

PeriodeListe.propTypes = {
    arbeidsgiver: PropTypes.string,
    ledetekster: PropTypes.object,
    perioder: PropTypes.array,
};

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
        const antallPerioder = this.props.sykmelding.perioder.length;
        const sistePeriodeIndex = antallPerioder - 1;
        const days = getDuration(this.props.sykmelding.perioder[0].fom, this.props.sykmelding.perioder[sistePeriodeIndex].tom);

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
                        '%FOM%': formatDate(this.props.sykmelding.perioder[0].fom),
                        '%TOM%': formatDate(this.props.sykmelding.perioder[sistePeriodeIndex].tom),
                    })} </small>
                    <span className="teaser-tittel">
                        {getLedetekst('sykmelding.teaser.tittel', this.props.ledetekster)}
                    </span>
                </h3>
                {antallPerioder === 1 ? (<p className="js-meta typo-infotekst">
                                {getLedetekst('sykmelding.teaser.tekst', this.props.ledetekster, {
                                    '%GRAD%': this.props.sykmelding.perioder[0].grad,
                                    '%ARBEIDSGIVER%': this.props.sykmelding.arbeidsgiver,
                                    '%DAGER%': days,
                                })}
                            </p>) : (<PeriodeListe perioder={this.props.sykmelding.perioder} arbeidsgiver={this.props.sykmelding.arbeidsgiver} ledetekster={this.props.ledetekster} />)
                        }
            </div>
        </Link></article>);
    }
}

SykmeldingTeaser.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    ledetekster: PropTypes.object,
};

export default SykmeldingTeaser;
