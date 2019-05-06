import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, tidligsteFom, senesteTom, sykmeldingstatuser, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import SykmeldingPeriodeinfo from './SykmeldingPeriodeinfo';
import { sykmelding as sykmeldingPt, sykmeldingperiode } from '../../propTypes';

const PeriodeListe = ({ perioder, arbeidsgiver }) => {
    return (<ul className="teaser-punktliste js-perioder">
        {perioder.map((periode, index) => {
            return (<SykmeldingPeriodeinfo key={index} periode={periode} arbeidsgiver={arbeidsgiver} Element="li" />);
        })}
    </ul>);
};

PeriodeListe.propTypes = {
    arbeidsgiver: PropTypes.string,
    perioder: PropTypes.arrayOf(sykmeldingperiode),
};

export const SykmeldingTeaserIkon = () => {
    return (<React.Fragment>
        <span className="inngangspanel__ikon inngangspanel__ikon--normal">
            <img alt="" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykmeldinger.svg`} />
        </span>
        <span className="inngangspanel__ikon inngangspanel__ikon--hover">
            <img alt="" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykmeldinger_hover-blue.svg`} />
        </span>
    </React.Fragment>);
};

const SykmeldingTeaser = ({ sykmelding }) => {
    const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
    const visStatus = sykmelding.status !== sykmeldingstatuser.NY;

    return (<article aria-labelledby={`sykmelding-header-${sykmelding.id}`}>
        <Link
            className="inngangspanel inngangspanel--sykmelding"
            to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}`}>
            <SykmeldingTeaserIkon />
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`sykmelding-header-${sykmelding.id}`}>
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
                        (<SykmeldingPeriodeinfo
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
};

SykmeldingTeaser.propTypes = {
    sykmelding: sykmeldingPt,
};

export default SykmeldingTeaser;
