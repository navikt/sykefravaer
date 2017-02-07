import React, { PropTypes } from 'react';
import Soknad from './Soknad';
import { Avkrysset } from './Oppsummering/opplysninger';
import Sidetopp from '../Sidetopp';
import { SykmeldingNokkelOpplysning, Varselstripe, toDatePrettyPrint } from 'digisyfo-npm';
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
                                    </SykmeldingNokkelOpplysning>)
                                })
                            }
                        </div>)
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
        tittel: 'Status',
        opplysning: sykepengesoknad.status === 'SENDT' ? 'Sendt til arbeidsgiver' : 'Ukjent status',
    }, {
        tittel: 'Dato',
        opplysning: toDatePrettyPrint(sykepengesoknad.innsendtDato),
    }], [{
        tittel: 'Arbeidsgiver',
        opplysning: sykepengesoknad.arbeidsgiver.navn,
    }, {
        tittel: 'Organisasjonsnummer',
        opplysning: sykepengesoknad.arbeidsgiver.orgnummer,
    }]];

    return (<div>
        <Sidetopp tittel="Søknad om sykepenger" />
        <Statuspanel opplysninger={nokkelOpplysninger} />
        <SykmeldingUtdrag ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
        <Soknad ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
        <div className="bekreftet-container">
            <Avkrysset tekst="Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte." />
        </div>
    </div>);
};

SendtSoknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
};

export default SendtSoknad;
