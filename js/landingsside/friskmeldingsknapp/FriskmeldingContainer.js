import { senesteTom, tidligsteFom } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import Friskmelding from './Friskmelding';

const dagerDifferanse = (fra, til) => {
    const ETT_DOGN = 1000 * 60 * 60 * 24;
    return parseInt((til - fra) / ETT_DOGN, 10);
};

const beregnSykmeldingstype = (sykmelding) => {
    const { perioder } = sykmelding.mulighetForArbeid;
    const harBehandlingsdager = perioder.some(p => p.behandlingsdager !== null);
    const harReisetilskudd = perioder.some(p => p.reisetilskudd !== null);
    const erAvventende = perioder.some(p => p.avventende !== null);
    const erGradert = perioder.some(p => p.grad !== 100);

    return harBehandlingsdager
        ? 'BEHANDLINGSDAGER'
        : harReisetilskudd
            ? 'REISETILSKUDD'
            : erAvventende
                ? 'AVVENTENDE'
                : erGradert
                    ? 'GRADERT'
                    : 'UGRADERT';
};

export const mapStateToProps = (state) => {
    const iDag = new Date();
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        const fom = tidligsteFom(s.mulighetForArbeid.perioder);
        const tom = senesteTom(s.mulighetForArbeid.perioder);
        return iDag >= fom && iDag <= tom;
    });
    const erSykmeldt = sykmeldinger.length > 0;
    const antallDagerTilFrisk = sykmeldinger.length > 0
        ? dagerDifferanse(iDag, senesteTom(sykmeldinger[0].mulighetForArbeid.perioder))
        : null;
    const sykmeldingstype = sykmeldinger.length > 0
        ? beregnSykmeldingstype(sykmeldinger[0])
        : null;

    return {
        datalayerData: {
            erSykmeldt,
            antallDagerTilFrisk,
            sykmeldingstype,
        },
    };
};

export default connect(mapStateToProps)(Friskmelding);
