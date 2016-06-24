import React, { PropTypes } from 'react';
import StatusOpplysning from '../nokkelopplysninger/NokkelOpplysningerMapper';
import Varselstripe from './Varselstripe';

const StatusPanel = ({ sykmelding, ledetekster, nokkelopplysninger, type }) => {
    const html = nokkelopplysninger.map((rad) => {
        return (<div className="rad-container">
            {
                rad.map((nokkelopplysning) => {
                    return <StatusOpplysning ledetekster={ledetekster} sykmelding={sykmelding} nokkelopplysning={nokkelopplysning} />;
                })
            }
        </div>);
    });
    return (
        <div className="panel blokk">
            <Varselstripe type={type}>
               {html}
            </Varselstripe>
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: PropTypes.object,
    type: PropTypes.string,
    nokkelopplysninger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default StatusPanel;
