import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, tidligsteFom, senesteTom, sykmeldingstatuser, tilLesbarPeriodeMedArstall } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';
import SykmeldingPeriodeInfo from './SykmeldingPeriodeInfo';
import { sykmelding as sykmeldingPt, sykmeldingperiode } from '../../propTypes';

const PeriodeListe = ({ perioder, arbeidsgiver }) => {
    return (<ul className="teaser-punktliste js-perioder">
        {perioder.map((periode, index) => {
            return (<SykmeldingPeriodeInfo key={index} periode={periode} arbeidsgiver={arbeidsgiver} Element="li" />);
        })}
    </ul>);
};

PeriodeListe.propTypes = {
    arbeidsgiver: PropTypes.string,
    perioder: PropTypes.arrayOf(sykmeldingperiode),
};

class SykmeldingTeaser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'sykmeldinger.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'sykmeldinger_hover-blue.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'sykmeldinger.svg',
        });
    }

    render() {
        const { sykmelding } = this.props;
        const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
        const visStatus = sykmelding.status !== sykmeldingstatuser.NY;

        return (<article aria-labelledby={`sykmelding-header-${this.props.sykmelding.id}`}>
            <Link
                className="inngangspanel inngangspanel--sykmelding"
                to={`${getContextRoot()}/sykmeldinger/${this.props.sykmelding.id}`}
                onMouseEnter={() => {
                    this.onMouseEnter();
                }}
                onMouseLeave={() => {
                    this.onMouseLeave();
                }}>
                <span className="inngangspanel__ikon">
                    <img alt="" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`sykmelding-header-${this.props.sykmelding.id}`}>
                            <small className="inngangspanel__meta">
                                {tilLesbarPeriodeMedArstall(tidligsteFom(sykmelding.mulighetForArbeid.perioder), senesteTom(sykmelding.mulighetForArbeid.perioder))}
                            </small>
                            <span className="inngangspanel__tittel">
                                {getLedetekst('sykmelding.teaser.tittel')}
                            </span>
                        </h3>
                        {
                            visStatus && <p className="inngangspanel__status">{getLedetekst(`sykmelding.teaser.status.${sykmelding.status}`)}</p>
                        }
                    </header>
                    <div className="inngangspanel__tekst">
                        {antallPerioder === 1 ?
                            (<SykmeldingPeriodeInfo
                                periode={sykmelding.mulighetForArbeid.perioder[0]}
                                arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />)
                            : (<PeriodeListe
                                perioder={sykmelding.mulighetForArbeid.perioder}
                                arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />)
                        }
                    </div>
                </div>
            </Link>
        </article>);
    }
}

SykmeldingTeaser.propTypes = {
    sykmelding: sykmeldingPt,
};

export default SykmeldingTeaser;
