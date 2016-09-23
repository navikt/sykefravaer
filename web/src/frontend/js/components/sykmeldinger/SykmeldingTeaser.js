import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getLedetekst } from '../../ledetekster';
import SykmeldingPeriodeInfo from './SykmeldingPeriodeInfo';

const PeriodeListe = ({ perioder, arbeidsgiver, ledetekster }) => {
    return (<ul className="teaser-punktliste js-perioder">
        {perioder.map((periode, index) => {
            return (<SykmeldingPeriodeInfo key={index} periode={periode} arbeidsgiver={arbeidsgiver} Element="li" ledetekster={ledetekster} />);
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
            ikonHoykontrast: 'doctor-2-highcontrast.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'doctor-2_hover.svg',
            ikonHoykontrast: 'doctor-2_hover-highcontrast.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'doctor-2.svg',
            ikonHoykontrast: 'doctor-2-highcontrast.svg',
        });
    }

    render() {
        const { sykmelding, ledetekster } = this.props;
        const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
        const sistePeriodeIndex = antallPerioder - 1;
        const visStatus = sykmelding.status !== 'NY';

        return (<article aria-labelledby={`sykmelding-header-${this.props.sykmelding.id}`}>
            <Link className="inngangspanel" to={`${getContextRoot()}/sykmeldinger/${this.props.sykmelding.id}`}
                onMouseEnter={() => {this.onMouseEnter();}}
                onMouseLeave={() => {this.onMouseLeave();}}
            >
            <span className="inngangspanel__ikon">
                <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt="Lege" />
            </span>
            <span className="inngangspanel__ikon inngangspanel__ikon--hoykontrast">
                <img src={`/sykefravaer/img/svg/${this.state.ikonHoykontrast}`} alt="Lege" />
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`sykmelding-header-${this.props.sykmelding.id}`}>
                        <small className="inngangspanel__meta">{getLedetekst('sykmelding.teaser.dato', ledetekster, {
                            '%FOM%': toDatePrettyPrint(sykmelding.mulighetForArbeid.perioder[0].fom),
                            '%TOM%': toDatePrettyPrint(sykmelding.mulighetForArbeid.perioder[sistePeriodeIndex].tom),
                        })} </small>
                        <span className="inngangspanel__tittel">
                            {getLedetekst('sykmelding.teaser.tittel', ledetekster)}
                        </span>
                    </h3>
                    {
                        visStatus && <p className="inngangspanel__status">{getLedetekst(`sykmelding.teaser.status.${sykmelding.status}`, ledetekster)}</p>
                    }
                </header>
                {antallPerioder === 1 ?
                    (<SykmeldingPeriodeInfo
                        periode={sykmelding.mulighetForArbeid.perioder[0]}
                        arbeidsgiver={sykmelding.arbeidsgiver}
                        ledetekster={ledetekster} />)
                    : (<PeriodeListe
                        perioder={sykmelding.mulighetForArbeid.perioder}
                        arbeidsgiver={sykmelding.arbeidsgiver}
                        ledetekster={ledetekster} />)
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
