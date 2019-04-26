import React from 'react';
import { Link } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

const AvvistSykmeldingTeaser = ({ smSykmelding }) => {
    return (<article aria-labelledby={`sykmelding-header-${smSykmelding.id}`}>
        <Link
            className="inngangspanel inngangspanel--sykmelding"
            to={`${getContextRoot()}/sykmeldinger/${smSykmelding.id}`}>
            <span className="inngangspanel__ikon" />
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`sykmelding-header-${smSykmelding.id}`}>
                        <small className="inngangspanel__meta">
                            Dato
                        </small>
                        <span className="inngangspanel__tittel">
                            {getLedetekst('sykmelding.teaser.tittel')}
                        </span>
                    </h3>
                    <p className="inngangspanel__status">Avvist av NAV</p>
                </header>
            </div>
        </Link>
    </article>);
};

AvvistSykmeldingTeaser.propTypes = {
    smSykmelding: smSykmeldingPt,
};

export default AvvistSykmeldingTeaser;

