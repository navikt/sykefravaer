import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import { angreBekreftSykmelding as angreBekreftSykmeldingAction } from '../../actions/dinSykmelding_actions';
import { sykmeldingHarBehandletSoknad } from '../../selectors/soknaderSelectors';
import { toggleSykmeldingEndreArbeidssituasjon } from '../../selectors/unleashTogglesSelectors';

export const Container = ({ sykmelding, angreBekreftSykmelding, angreBekreftSykmeldingFeilet, vis, angrerBekreftSykmelding }) => {
    return vis ? (
        <div>
            <div className="verktoylinje">
                <Knapp
                    mini
                    autoDisableVedSpinner
                    spinner={angrerBekreftSykmelding}
                    htmlType="button"
                    type="standard"
                    className="js-gjenaapne-sykmelding"
                    onClick={() => { return angreBekreftSykmelding(sykmelding.id); }}>
                    {getLedetekst('din-sykmelding.godkjennt.angre')}
                </Knapp>
            </div>
            <div aria-live="polite">
                {
                    angreBekreftSykmeldingFeilet
                    && <p className="skjemaelement__feilmelding">{getLedetekst('din-sykmelding.godkjennt.angre.feilet')}</p>
                }
            </div>
        </div>
    ) : null;
};

Container.propTypes = {
    sykmelding: sykmeldingPt,
    angreBekreftSykmelding: PropTypes.func.isRequired,
    angreBekreftSykmeldingFeilet: PropTypes.bool,
    angrerBekreftSykmelding: PropTypes.bool,
    vis: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const FIRE_MANEDER_SIDEN = new Date();
    FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
    const vis = ownProps.sykmelding.sendtdato > FIRE_MANEDER_SIDEN
        && !sykmeldingHarBehandletSoknad(state, ownProps.sykmelding.id)
        && toggleSykmeldingEndreArbeidssituasjon(state);
    return {
        vis,
        angreBekreftSykmeldingFeilet: state.dineSykmeldinger.angreBekreftSykmeldingFeilet,
        angrerBekreftSykmelding: state.dineSykmeldinger.angrerBekreftSykmelding,
    };
};

export default connect(mapStateToProps, { angreBekreftSykmelding: angreBekreftSykmeldingAction })(Container);
