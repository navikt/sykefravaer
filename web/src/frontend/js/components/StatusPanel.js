import React, { PropTypes } from 'react';
import StatusOpplysning from '../nokkelopplysninger/NokkelOpplysningerMapper';

const StatusPanel = ({ sykmelding, ledetekster, nokkelopplysninger }) => {
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
           <div className="varselstripe varselstripe--success">
               {html}
           </div>
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: PropTypes.object,
    nokkelopplysninger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default StatusPanel;
