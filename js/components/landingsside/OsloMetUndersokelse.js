import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tidligsteFom, senesteTom, sykmeldingstatuser, log } from 'digisyfo-npm';

const pushToDataLayer = (action) => {
    /* eslint-disable */
    const args = {
        'event': 'DIGISYFO_OSLOMET_2',
        'action': action
    };
    log('Push til datalayer', args);
    window.dataLayer.push(args);
    /* eslint-enable */
};

const Panel = () => {
    return (<div className="panel landingspanel">
        <h2 className="panel__tittel">Hjelp oss å forstå mer om sykefravær</h2>
        <p>Er du sykmeldt på grunn av smerter i muskler og ledd? Du er velkommen
            til å svare på noen spørsmål – så forstår vi bedre hvordan vi kan gi
            oppfølging til deg og andre i samme situasjon.</p>
        <a
            onClick={() => {
                pushToDataLayer('OSLOMET_KLIKKET');
            }}
            href="https://skjema.uio.no/screening"
            rel="noopener noreferrer"
            target="_blank"
            className="knapp knapp--mini">Bli med</a>
    </div>);
};

class Container extends Component {
    componentDidMount() {
        if (this.props.vis) {
            pushToDataLayer('OSLOMET_VIST');
        }
    }

    render() {
        return this.props.vis
            ? <Panel />
            : null;
    }
}

Container.propTypes = {
    vis: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const ETT_DOGN = 1000 * 60 * 60 * 24;
    const DAGENS_DATO = new Date();
    const FEMTISJU_DAGER_SIDEN = new Date(DAGENS_DATO.getTime() - (57 * ETT_DOGN));
    const TJUESJU_DAGER_SIDEN = new Date(DAGENS_DATO.getTime() - (27 * ETT_DOGN));

    const vis = (() => {
        const sykeforloep = state.sykeforloep.data.length > 0
            ? state.sykeforloep.data[0]
            : null;
        if (!sykeforloep) {
            return false;
        }
        const oppfoelgingsdato = state.sykeforloep.startdato;
        const harAktivSykmelding = sykeforloep.sykmeldinger.filter((sykmelding) => {
            const tom = senesteTom(sykmelding.mulighetForArbeid.perioder);
            const fom = tidligsteFom(sykmelding.mulighetForArbeid.perioder);
            return (sykmelding.status === sykmeldingstatuser.TIL_SENDING
                || sykmelding.status === sykmeldingstatuser.BEKREFTET
                || sykmelding.status === sykmeldingstatuser.SENDT)
                && DAGENS_DATO <= tom
                && DAGENS_DATO >= fom;
        }).length > 0;

        return harAktivSykmelding
            && FEMTISJU_DAGER_SIDEN < oppfoelgingsdato
            && TJUESJU_DAGER_SIDEN > oppfoelgingsdato;
    })();

    return {
        vis,
    };
};

export default connect(mapStateToProps)(Container);
