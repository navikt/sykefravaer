import React, { PropTypes } from 'react';
import Radiogruppe from '../skjema/Radiogruppe';
import Checkboxgruppe from '../skjema/Checkboxgruppe';
import Checkbox from '../skjema/Checkbox';
import { getLedetekst } from '../../ledetekster';
import { filtrerObjektKeys } from '../../utils';

export const DuTrengerNySykmelding = () => {
    return (<div className="panel panel-relatert">
        <h4 className="hode hode-advarsel hode-dekorert typo-undertittel">Du trenger ny sykmelding</h4>
        <p>Du må avbryte denne sykmeldingen, og kontakte den som har sykmeldt deg for å få en ny.</p>
    </div>);
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = () => {
    return (<div className="panel panel-relatert">
        <h4 className="typo-undertittel blokk-xs">Du kan bruke sykmeldingen din</h4>
        <p>Du velger hvilken arbeidsgiver du skal sende sykmeldingen til i neste steg.
        Vær oppmerksom på at den du sender til likevel får se hvilken arbeidsgiver som
        opprinnelig sto i sykmeldingen. Hvis sykmeldingen senere skal forlenges, må du
        gi beskjed til den som sykmelder deg om at den inneholder feil. </p>
    </div>);
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = () => {
    return (<div className="panel panel-relatert">
        <h4 className="typo-undertittel blokk-xs">Du kan bruke sykmeldingen din</h4>
        <p>Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.</p>
    </div>);
};

export const SykmeldingFeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger = {} }) => {
    if (feilaktigeOpplysninger.periode || feilaktigeOpplysninger.sykmeldingsgrad) {
        return <DuTrengerNySykmelding />;
    }
    if (feilaktigeOpplysninger.arbeidsgiver) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver />;
    }
    if (feilaktigeOpplysninger.diagnose || feilaktigeOpplysninger.andre) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre />;
    }
    return null;
};

SykmeldingFeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: PropTypes.object,
};

export const HvilkeOpplysningerErIkkeRiktige = ({ sykmeldingId, feilaktigeOpplysninger = {}, setFeilaktigOpplysning, ledetekster }) => {
    const inputs = ['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre'];
    const checkboxer = inputs.map((input) => {
        return (<Checkbox key={input}
            value={input}
            label={getLedetekst(`sykmelding.bekreft-opplysninger.hvilke-opplysninger.${input}`, ledetekster)}
            id={input}
            name={input}
            changeHandler={(bool) => {
                setFeilaktigOpplysning(sykmeldingId, input, bool);
            }}
            erValgt={feilaktigeOpplysninger[input]} />);
    });
    const erFeil = filtrerObjektKeys(feilaktigeOpplysninger).length === 0;

    return (<Checkboxgruppe
        erFeil={erFeil}
        feilmelding="Vennligst oppgi hva som ikke er riktig"
        spoersmaal={getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.sporsmal', ledetekster)}>
        {checkboxer}
        <SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger} />
    </Checkboxgruppe>);
};

HvilkeOpplysningerErIkkeRiktige.propTypes = {
    sykmeldingId: PropTypes.string,
    feilaktigeOpplysninger: PropTypes.object,
    setFeilaktigOpplysning: PropTypes.func,
    ledetekster: PropTypes.object,
};

const ErOpplysningeneRiktige = ({ sykmelding, setOpplysningeneErRiktige, setFeilaktigOpplysning, ledetekster, erFeil, feilmelding }) => {
    const valgtVerdi = sykmelding.opplysningeneErRiktige !== undefined ? sykmelding.opplysningeneErRiktige.toString() : 'undefined';

    return (<div className="blokk">
        <Radiogruppe erFeil={erFeil}
            feilmelding={feilmelding}
            spoersmaal={getLedetekst('sykmelding.bekreft-opplysninger.sporsmal', ledetekster)}
            valgtVerdi={valgtVerdi}
            name="opplysningeneErRiktige"
            onChange={(erRiktige) => {
                setOpplysningeneErRiktige(sykmelding.id, erRiktige === 'true');
            }}>
            <input value="true" label={getLedetekst('sykmelding.bekreft-opplysninger.svar-ja', ledetekster)} />
            <input value="false" label={getLedetekst('sykmelding.bekreft-opplysninger.svar-nei', ledetekster)}>
                <div className="panel panel-ekstra">
                    <HvilkeOpplysningerErIkkeRiktige
                        sykmeldingId={sykmelding.id}
                        feilaktigeOpplysninger={sykmelding.feilaktigeOpplysninger}
                        setFeilaktigOpplysning={setFeilaktigOpplysning}
                        ledetekster={ledetekster} />
                </div>
            </input>
        </Radiogruppe>
    </div>);
};

ErOpplysningeneRiktige.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    setOpplysningeneErRiktige: PropTypes.func.isRequired,
    setFeilaktigOpplysning: PropTypes.func.isRequired,
    ledetekster: PropTypes.object,
    erFeil: PropTypes.bool,
    feilmelding: PropTypes.string,
};

export default ErOpplysningeneRiktige;
