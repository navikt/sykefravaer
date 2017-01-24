import React, { PropTypes } from 'react';
import { Avkrysset } from './opplysninger';

export const Perioder = ({ perioder }) => {
    return (<ul className="oppsummering__perioder">
    {
        perioder.map((periode, index) => {
            return (<li key={index}>
                <span className="oppsummering__fom">Fra {periode.fom} </span>
                <span className="oppsummering__tom">Til {periode.tom}</span>
            </li>);
        })
    }
    </ul>);
};

Perioder.propTypes = {
    perioder: PropTypes.array,
};

const Egenmeldingsdager = ({ soknad }) => {
    return (<div className="js-egenmeldingsdager oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Brukte du egenmeldingsdager før du ble sykmeldt den 01.12.2016?</h3>
        <Avkrysset tekst={soknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer ? 'Ja' : 'Nei'} />
        {soknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer && <Perioder perioder={soknad.egenmeldingsperioder} /> }
    </div>);
};

Egenmeldingsdager.propTypes = {
    soknad: PropTypes.object,
};

const GjenopptattArbeidFulltUt = ({ soknad }) => {
    return (<div className="js-gjenopptattArbeid oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Har du gjenopptatt arbeidet ditt hos SOLSTRÅLEN BARNEHAGE fullt ut?</h3>
        <Avkrysset tekst={soknad.harGjenopptattArbeidFulltUt ? 'Ja' : 'Nei'} />
        {soknad.harGjenopptattArbeidFulltUt && <p className="oppsummering__dato">Den {soknad.gjenopptattArbeidFulltUtDato}</p>}
    </div>);
};

GjenopptattArbeidFulltUt.propTypes = {
    soknad: PropTypes.object,
};

const Ferie = ({ soknad }) => {
    return (<div className="js-ferie">
        <Avkrysset tekst="tatt ut ferie" />
        <Perioder perioder={soknad.ferie.perioder} />
    </div>);
};

Ferie.propTypes = {
    soknad: PropTypes.object,
};

const Permisjon = ({ soknad }) => {
    return (<div className="js-permisjon blokk">
        <Avkrysset tekst="hatt permisjon" />
        <Perioder perioder={soknad.permisjon.perioder} />
    </div>);
};

Permisjon.propTypes = {
    soknad: PropTypes.object,
};

const Utenlandsopphold = ({ soknad }) => {
    return (<div className="js-utenlandsopphold">
        <Avkrysset tekst="oppholdt meg utenfor Norge" />
        <Perioder perioder={soknad.utenlandsopphold.perioder} />
        <div className="js-utenlandsoppholdSoktOmSykepenger oppsummering__tilleggssvar">
            <h5 className="oppsummering__sporsmal">Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?</h5>
            <Avkrysset tekst={soknad.utenlandsoppholdSoktOmSykepenger ? 'Ja' : 'Nei'} />
        </div>
    </div>);
};

Utenlandsopphold.propTypes = {
    soknad: PropTypes.object,
};

const FeriePermisjonEllerUtenlandsopphold = ({ soknad }) => {
    return (<div className="js-feriePermisjonUtenlandsopphold oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 - 31.01.2017?</h3>
        <Avkrysset tekst={soknad.harHattFeriePermisjonEllerUtenlandsopphold ? 'Ja' : 'Nei'} />
        {
            soknad.harHattFeriePermisjonEllerUtenlandsopphold && <h4 className="oppsummering__sporsmal">Jeg har ...</h4>
        }
        {
            soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.ferie && soknad.ferie.avkrysset && <Ferie soknad={soknad} />
        }
        {
            soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.permisjon && soknad.permisjon.avkrysset && <Permisjon soknad={soknad} />
        }
        {
            soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.utenlandsopphold && soknad.utenlandsopphold.avkrysset && <Utenlandsopphold soknad={soknad} />
        }

    </div>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    soknad: PropTypes.object,
};

const FravaerOgFriskmelding = ({ soknad }) => {
    return (<div>
        <Egenmeldingsdager soknad={soknad} />
        <GjenopptattArbeidFulltUt soknad={soknad} />
        <FeriePermisjonEllerUtenlandsopphold soknad={soknad} />
    </div>);
};

FravaerOgFriskmelding.propTypes = {
    soknad: PropTypes.object,
};

export default FravaerOgFriskmelding;
