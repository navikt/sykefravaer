import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../../felleskomponenter/Soknadskjema';
import { KnapperadTilbake } from '../../../components/skjema/Knapperad';
import { soknadPt } from '../../../propTypes';
import Sporsmalsliste from '../../felleskomponenter/sporsmal/Sporsmalsliste';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import AppSpinner from '../../../components/AppSpinner';

export const hentSporsmalForDenneSiden = (soknad, sidenummer) => {
    return [soknad.sporsmal[sidenummer - 1]];
};

const EttSporsmalPerSideSkjema = (props) => {
    const { handleSubmit, soknad, actions, sidenummer } = props;
    const sporsmalsliste = hentSporsmalForDenneSiden(soknad, sidenummer);
    const onSubmit = () => {
        actions.lagreSoknad(soknad);
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/side/${sidenummer + 1}`);
    };

    return (<form className="soknadskjema" id="ett-sporsmal-per-side" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSkjemanavnFraSoknad(soknad)} />
        <Sporsmalsliste sporsmalsliste={sporsmalsliste} soknad={soknad} />
        <KnapperadTilbake forrigeUrl={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/side/${sidenummer - 1}`} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

EttSporsmalPerSideSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
    }),
    sidenummer: PropTypes.number,
};

const EttSporsmalPerSide = (props) => {
    const { sykmelding, soknad, handleSubmit, actions, sidenummer, oppdaterer } = props;
    return (<Soknadskjema
        sykmelding={sykmelding}
        soknad={soknad}>
        {
            oppdaterer
                ? <AppSpinner />
                : <EttSporsmalPerSideSkjema
                    soknad={soknad}
                    handleSubmit={handleSubmit}
                    actions={actions}
                    sidenummer={sidenummer} />
        }
    </Soknadskjema>);
};

EttSporsmalPerSide.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
    }),
    sidenummer: PropTypes.number,
    oppdaterer: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        oppdaterer: state.soknader.oppdaterer,
    };
};

export default connect(mapStateToProps)(EttSporsmalPerSide);
