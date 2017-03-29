import React, { PropTypes } from 'react';
import { Varselstripe, SykmeldingNokkelOpplysning } from 'digisyfo-npm';

export const Statuspanel = ({ opplysninger }) => {
    return (<div className="panel panel-komprimert blokk">
        <Varselstripe type="suksess">
            <div>
                {
                    opplysninger.map((opplysninger_, index1) => {
                        return (<div className="rad-container" key={index1}>
                            {
                                opplysninger_.map(({ tittel, opplysning, hjelpetekst }, index2) => {
                                    return (<SykmeldingNokkelOpplysning Overskrift="h2" tittel={tittel} key={index2}>
                                        {
                                            hjelpetekst ?
                                                <div>
                                                    <span>{opplysning}</span>{hjelpetekst}
                                                </div>
                                                :
                                                <p>{opplysning}</p>
                                        }
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
    opplysninger: PropTypes.arrayOf(PropTypes.shape({
        tittel: PropTypes.string.isRequired,
        opplysning: PropTypes.string.isRequired,
        hjelpetekst: PropTypes.object,
    })),
};

export default Statuspanel;
