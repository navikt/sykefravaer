import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { getLedetekst } from '../../digisyfoNpm';
import { visAvvistSykmeldingBekreftetLestKvittering } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';

const Stripe = ({ vis }) => {
    return vis
        ? (
            <div aria-live="assertive" role="alert">
                <AlertStripeSuksess className="landingspanel">
                    {getLedetekst('avvist-sykmelding.bekreftet.kvittering')}
                </AlertStripeSuksess>
            </div>
        )
        : null;
};

Stripe.propTypes = {
    vis: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        vis: visAvvistSykmeldingBekreftetLestKvittering(state),
    };
};

const AvvistSykmeldingKvittering = connect(mapStateToProps)(Stripe);

export default AvvistSykmeldingKvittering;
