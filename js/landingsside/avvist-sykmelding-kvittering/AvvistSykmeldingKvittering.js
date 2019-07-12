import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { visAvvistSykmeldingBekreftetLestKvittering } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';

const Stripe = ({ vis }) => (vis
    ? (
        <div aria-live="assertive" role="alert">
            <AlertStripeSuksess className="landingspanel">
                {getLedetekst('avvist-sykmelding.bekreftet.kvittering')}
            </AlertStripeSuksess>
        </div>
    )
    : null);

Stripe.propTypes = {
    vis: PropTypes.bool,
};

const mapStateToProps = state => ({
    vis: visAvvistSykmeldingBekreftetLestKvittering(state),
});

const AvvistSykmeldingKvittering = connect(mapStateToProps)(Stripe);

export default AvvistSykmeldingKvittering;
