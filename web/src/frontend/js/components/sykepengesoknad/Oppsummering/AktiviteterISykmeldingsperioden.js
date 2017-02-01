import React, { PropTypes } from 'react';
import { Avkrysset } from './opplysninger';
import { toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import { inntektskildeLabels } from '../AktiviteterISykmeldingsperioden/AndreInntektskilder';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';

const getLedetekstPrefix = (aktivitet) => {
    return aktivitet.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';
};

export const Avvik = ({ aktivitet, arbeidsgiver, ledetekster }) => {
    const { arbeidsgrad, timer, arbeidstimerNormalUke } = aktivitet.avvik;
    const antall = arbeidsgrad ? `${arbeidsgrad} prosent` : `${timer} timer`;
    return (<div className="js-avvik">
        <div>
            <h4 className="oppsummering__sporsmal">{
                getLedetekst('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet', ledetekster, {
                    '%ARBEIDSGIVER%': arbeidsgiver,
                })
            }</h4>
            <p>{antall} totalt per uke</p>
        </div>
        <div>
            <h4 className="oppsummering__sporsmal">Hvor mange timer jobber du normalt per uke?</h4>
            <p>{arbeidstimerNormalUke} timer totalt per uke</p>
        </div>
    </div>);
};

Avvik.propTypes = {
    aktivitet: PropTypes.object,
    arbeidsgiver: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const Aktivitet = ({ aktivitet, ledetekster, arbeidsgiver }) => {
    const ledetekstPrefix = getLedetekstPrefix(aktivitet);

    return (<div className="oppsummering__bolk">
        <p className="oppsummering__sporsmal">
        {
            getLedetekst(`${ledetekstPrefix}.intro`, ledetekster, {
                '%FOM%': toDatePrettyPrint(aktivitet.periode.fom),
                '%TOM%': toDatePrettyPrint(aktivitet.periode.tom),
                '%ARBEIDSGIVER%': arbeidsgiver,
                '%ARBEIDSGRAD%': 100 - aktivitet.grad,
            })
        }
        </p>
        <h3 className="oppsummering__sporsmal">{getLedetekst(`${ledetekstPrefix}.sporsmal`, ledetekster)}</h3>
        <Avkrysset tekst={aktivitet.avvik ? 'Ja' : 'Nei'} />
        {
            aktivitet.avvik && <Avvik aktivitet={aktivitet} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />
        }
    </div>);
};

Aktivitet.propTypes = {
    ledetekster: PropTypes.object,
    aktivitet: PropTypes.object,
    arbeidsgiver: PropTypes.string,
};

export const Aktiviteter = ({ sykepengesoknad, ledetekster }) => {
    return (<div>
        {sykepengesoknad.aktiviteter.map((aktivitet, index) => {
            return <Aktivitet aktivitet={aktivitet} index={index} ledetekster={ledetekster} key={index} />;
        })}
    </div>);
};

Aktiviteter.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};


const AndreInntektskilder = ({ inntektskilder }) => {
    return (<div className="oppsummering__bolk">
        {
            inntektskilder.map((k, index) => {
                return (<div key={index}>
                    <Avkrysset tekst={inntektskildeLabels[k.annenInntektskildeType]} />
                    {
                        k.annenInntektskildeType !== 'ANNET' && <div className="js-inntektskilde-sykmeldt oppsummering__tilleggssvar">
                            <h5 className="oppsummering__sporsmal">Er du sykmeldt fra dette?</h5>
                            <Avkrysset tekst={k.sykmeldt ? 'Ja' : 'Nei'} />
                        </div>
                    }
                </div>);
            })
        }
    </div>);
};

AndreInntektskilder.propTypes = {
    inntektskilder: PropTypes.array,
};

export const Inntektskilder = ({ sykepengesoknad }) => {
    return (<div>
        <h3 className="oppsummering__sporsmal">Har du andre inntektskilder enn {sykepengesoknad.arbeidsgiver.navn}?</h3>
        <Avkrysset tekst={sykepengesoknad.andreInntektskilder.length > 0 ? 'Ja' : 'Nei'} />
        {
            sykepengesoknad.andreInntektskilder.length > 0 && <h4 className="oppsummering__sporsmal">Hvilke inntektskilder har du?</h4>
        }
        {
            sykepengesoknad.andreInntektskilder.length > 0 && <AndreInntektskilder inntektskilder={sykepengesoknad.andreInntektskilder} />
        }
    </div>);
};

Inntektskilder.propTypes = {
    sykepengesoknad: PropTypes.object,
};

export const Utdanning = ({ sykepengesoknad }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    return (<div>
        <h3 className="oppsummering__sporsmal">Har du vært under utdanning i løpet av perioden {toDatePrettyPrint(tidligsteFom(perioder))} - {toDatePrettyPrint(senesteTom(perioder))}?</h3>
        <Avkrysset tekst={sykepengesoknad.utdanning ? 'Ja' : 'Nei'} />
        {
            sykepengesoknad.utdanning && (<div className="js-utdanning-fulltid">
                <h3 className="oppsummering__sporsmal">Er utdanningen et fulltidsstudium?</h3>
                <Avkrysset tekst={sykepengesoknad.utdanning.erUtdanningFulltidsstudium ? 'Ja' : 'Nei'} />
            </div>)
        }
        {
            sykepengesoknad.utdanning && (<div className="js-utdanning-start">
                <h3 className="oppsummering__sporsmal">Når startet du på utdanningen?</h3>
                <p>Den {toDatePrettyPrint(sykepengesoknad.utdanning.utdanningStartdato)}</p>
            </div>)
        }
    </div>);
};

Utdanning.propTypes = {
    sykepengesoknad: PropTypes.object,
};

const AktiviteterISykmeldingsperioden = ({ sykepengesoknad, ledetekster }) => {
    return (<div>
        <Aktiviteter sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <Inntektskilder sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <Utdanning sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default AktiviteterISykmeldingsperioden;
