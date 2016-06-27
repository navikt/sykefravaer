import React, { PropTypes } from 'react';
import StatusOpplysning from '../nokkelopplysninger/NokkelOpplysningerMapper';
import Varselstripe from './Varselstripe';

const StatusPanel = ({ sykmelding, ledetekster, nokkelopplysninger }) => {
    const html = nokkelopplysninger.map((rad) => {
        return (<div className="rad-container">
            {
                rad.map((nokkelopplysning, index) => {
                    return <StatusOpplysning key={index} ledetekster={ledetekster} sykmelding={sykmelding} nokkelopplysning={nokkelopplysning} />;
                })
            }
        </div>);
    });
    return (
        <div className="panel blokk">
            <Varselstripe type="suksess">
               <div>{html}</div>
            </Varselstripe>
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: PropTypes.object,
    nokkelopplysninger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default StatusPanel;
