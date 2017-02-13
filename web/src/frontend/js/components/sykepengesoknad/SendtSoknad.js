import React, { PropTypes } from 'react';
import Soknad from './Soknad';
import { Avkrysset } from './Oppsummering/opplysninger';
import Sidetopp from '../Sidetopp';
import { SykmeldingNokkelOpplysning, Varselstripe, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';

const Statuspanel = ({ opplysninger }) => {
    return (<div className="panel panel-komprimert blokk">
        <Varselstripe type="suksess">
            <div>
                {
                    opplysninger.map((opplysninger_, index1) => {
                        return (<div className="rad-container" key={index1}>
                            {
                                opplysninger_.map(({ tittel, opplysning }, index2) => {
                                    return (<SykmeldingNokkelOpplysning Overskrift="h2" tittel={tittel} key={index2}>
                                        <p>{opplysning}</p>
                                    </SykmeldingNokkelOpplysning>);
                                })
                            }
                        </div>);
                    })
                }
            </div>
        </Varselstripe>
    </div>);
};

Statuspanel.propTypes = {
    opplysninger: PropTypes.array,
};

const SendtSoknad = ({ ledetekster, sykepengesoknad }) => {
    const nokkelOpplysninger = [[{
        tittel: getLedetekst('sykepengesoknad.oppsummering.status.label', ledetekster),
        opplysning: sykepengesoknad.status === 'SENDT' ? getLedetekst('sykepengesoknad.status.SENDT', ledetekster) : 'Ukjent status',
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.dato.label', ledetekster),
        opplysning: toDatePrettyPrint(sykepengesoknad.innsendtDato),
    }], [{
        tittel: getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver.label', ledetekster),
        opplysning: sykepengesoknad.arbeidsgiver.navn,
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.organisasjonsnummer.label', ledetekster),
        opplysning: sykepengesoknad.arbeidsgiver.orgnummer,
    }]];

    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel', ledetekster)} />
        <Statuspanel opplysninger={nokkelOpplysninger} />
        <SykmeldingUtdrag ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
        <Soknad ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
        <div className="bekreftet-container">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label', ledetekster)} />
        </div>
    </div>);
};

SendtSoknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
};

export default SendtSoknad;
