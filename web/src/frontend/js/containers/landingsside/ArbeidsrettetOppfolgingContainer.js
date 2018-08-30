import React from 'react';
import PropTypes from 'prop-types';
import { tidligsteFom, senesteTom, getLedetekst, sykmeldingstatuser } from 'digisyfo-npm';
import { connect } from 'react-redux';
import IllustrertInnhold from '../../components/IllustrertInnhold';

const Inngang = () => {
    return (<div className="panel panel--komprimert landingspanel">
        <IllustrertInnhold
            ikon="/sykefravaer/img/svg/forstorrelsesglass.svg"
            ikonAlt={getLedetekst('sykefravaer.arbeidsrettet-oppfolging.alt')}
            revers>
            <h2 className="panel__tittel">{getLedetekst('sykefravaer.arbeidsrettet-oppfolging.tittel')}</h2>
            <p className="sist"><a
                id="lenke-til-tiltakinfo"
                className="lenke"
                href="/tiltakinfo/">{getLedetekst('sykefravaer.arbeidsrettet-oppfolging.lenketekst')}</a></p>
        </IllustrertInnhold>
    </div>);
};

export const Container = ({ skalVises = false }) => {
    return skalVises ? <Inngang /> : null;
};

Container.propTypes = {
    skalVises: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const FJORTEN_DAGER = 1000 * 60 * 60 * 24 * 14;
    const iDag = new Date();
    const antallAktuelleSykmeldinger = state.sykeforloep.data.length > 0
        && state.sykeforloep.data[0].sykmeldinger
            .filter((s) => {
                return s.status !== sykmeldingstatuser.NY;
            })
            .filter((s) => {
                const fom = tidligsteFom(s.mulighetForArbeid.perioder);
                const tom = senesteTom(s.mulighetForArbeid.perioder);
                return iDag > fom && iDag <= tom;
            }).length;

    const harAktuelleSykmeldinger = antallAktuelleSykmeldinger > 0;

    const skalVises = harAktuelleSykmeldinger
        && (iDag.getTime() - state.sykeforloep.data[0].oppfoelgingsdato.getTime()) >= FJORTEN_DAGER;

    return {
        skalVises,
    };
};

const ArbeidsrettetOppfolgingContainer = connect(mapStateToProps)(Container);

export default ArbeidsrettetOppfolgingContainer;
