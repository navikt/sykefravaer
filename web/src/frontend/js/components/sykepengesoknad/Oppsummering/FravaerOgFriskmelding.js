import React, { PropTypes } from 'react';
import { Avkrysset } from './opplysninger';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';

export const Perioder = ({ perioder }) => {
    return (<ul className="oppsummering__perioder js-perioder">
    {
        perioder.map((periode, index) => {
            return (<li key={index}>
                <span className="oppsummering__fom">Fra {toDatePrettyPrint(periode.fom)} </span>
                <span className="oppsummering__tom">Til {toDatePrettyPrint(periode.tom)}</span>
            </li>);
        })
    }
    </ul>);
};

Perioder.propTypes = {
    perioder: PropTypes.array,
};

const Egenmeldingsdager = ({ sykepengesoknad }) => {
    return (<div className="js-egenmeldingsdager oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Brukte du egenmeldingsdager før det legemeldte fraværet startet den {toDatePrettyPrint(sykepengesoknad.identdato)}?</h3>
        <Avkrysset tekst={sykepengesoknad.egenmeldingsperioder.length > 0 ? 'Ja' : 'Nei'} />
        {sykepengesoknad.egenmeldingsperioder.length > 0 && <Perioder perioder={sykepengesoknad.egenmeldingsperioder} /> }
    </div>);
};

Egenmeldingsdager.propTypes = {
    sykepengesoknad: PropTypes.object,
};

const GjenopptattArbeidFulltUt = ({ sykepengesoknad }) => {
    return (<div className="js-gjenopptattArbeid oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Har du gjenopptatt arbeidet ditt hos {sykepengesoknad.arbeidsgiver.navn} fullt ut?</h3>
        <Avkrysset tekst={sykepengesoknad.gjenopptattArbeidFulltUtDato ? 'Ja' : 'Nei'} />
        {sykepengesoknad.gjenopptattArbeidFulltUtDato && <p className="oppsummering__dato">Den {toDatePrettyPrint(sykepengesoknad.gjenopptattArbeidFulltUtDato)}</p>}
    </div>);
};

GjenopptattArbeidFulltUt.propTypes = {
    sykepengesoknad: PropTypes.object,
};

const Ferie = ({ perioder }) => {
    return (<div className="js-ferie">
        <Avkrysset tekst="tatt ut ferie" />
        <Perioder perioder={perioder} />
    </div>);
};

Ferie.propTypes = {
    perioder: PropTypes.array,
};

const Permisjon = ({ perioder }) => {
    return (<div className="js-permisjon blokk">
        <Avkrysset tekst="hatt permisjon" />
        <Perioder perioder={perioder} />
    </div>);
};

Permisjon.propTypes = {
    perioder: PropTypes.array,
};

const Utenlandsopphold = ({ perioder, soektOmSykepengerIPerioden }) => {
    return (<div className="js-utenlandsopphold">
        <Avkrysset tekst="oppholdt meg utenfor Norge" />
        <Perioder perioder={perioder} />
        <div className="js-utenlandsoppholdSoktOmSykepenger oppsummering__tilleggssvar">
            <h5 className="oppsummering__sporsmal">Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?</h5>
            <Avkrysset tekst={soektOmSykepengerIPerioden ? 'Ja' : 'Nei'} />
        </div>
    </div>);
};

Utenlandsopphold.propTypes = {
    soektOmSykepengerIPerioden: PropTypes.bool,
    perioder: PropTypes.array,
};

export const FeriePermisjonEllerUtenlandsopphold = ({ sykepengesoknad }) => {
    const harHattFerie = sykepengesoknad.ferie && sykepengesoknad.ferie.length > 0;
    const harHattPermisjon = sykepengesoknad.permisjon && sykepengesoknad.permisjon.length > 0;
    const harHattUtenlandsopphold = sykepengesoknad.utenlandsopphold && sykepengesoknad.utenlandsopphold.perioder && sykepengesoknad.utenlandsopphold.perioder.length > 0;
    const harHattFeriePermisjonEllerUtenlandsopphold = harHattFerie || harHattPermisjon || harHattUtenlandsopphold;
    const sykmeldingsperioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });

    return (<div className="js-feriePermisjonUtenlandsopphold oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden {toDatePrettyPrint(tidligsteFom(sykmeldingsperioder))} - {toDatePrettyPrint(senesteTom(sykmeldingsperioder))}?</h3>
        <Avkrysset tekst={harHattFeriePermisjonEllerUtenlandsopphold ? 'Ja' : 'Nei'} />
        {
            harHattFeriePermisjonEllerUtenlandsopphold && <h4 className="oppsummering__sporsmal">Jeg har ...</h4>
        }
        {
            harHattFerie && <Ferie perioder={sykepengesoknad.ferie} />
        }
        {
            harHattPermisjon && <Permisjon perioder={sykepengesoknad.permisjon} />
        }
        {
            harHattUtenlandsopphold && <Utenlandsopphold
                perioder={sykepengesoknad.utenlandsopphold.perioder}
                soektOmSykepengerIPerioden={sykepengesoknad.utenlandsopphold.soektOmSykepengerIPerioden} />
        }
    </div>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    sykepengesoknad: PropTypes.object,
};

const FravaerOgFriskmelding = ({ sykepengesoknad }) => {
    return (<div id="fravaer-og-friskmelding">
        <Egenmeldingsdager sykepengesoknad={sykepengesoknad} />
        <GjenopptattArbeidFulltUt sykepengesoknad={sykepengesoknad} />
        <FeriePermisjonEllerUtenlandsopphold sykepengesoknad={sykepengesoknad} />
    </div>);
};

FravaerOgFriskmelding.propTypes = {
    sykepengesoknad: PropTypes.object,
};

export default FravaerOgFriskmelding;
