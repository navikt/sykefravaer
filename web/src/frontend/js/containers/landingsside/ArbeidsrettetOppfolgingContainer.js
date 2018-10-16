import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { erTiltakSykmeldteInngangAktivSelector } from '../../selectors/sykeforloepMetadataSelectors';

export const Inngang = () => {
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

export const Container = ({ skalViseInngang = false }) => {
    return skalViseInngang ? <Inngang /> : null;
};

Container.propTypes = {
    skalViseInngang: PT.bool,
};

const mapStateToProps = (state) => {
    return {
        skalViseInngang: erTiltakSykmeldteInngangAktivSelector(state),
    };
};

const ArbeidsrettetOppfolgingContainer = connect(mapStateToProps)(Container);

export default ArbeidsrettetOppfolgingContainer;
