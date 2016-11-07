import React, { PropTypes } from 'react';
import StatusOpplysning from '../nokkelopplysninger/StatusOpplysning';
import { Varselstripe } from 'digisyfo-npm';

const StatusPanel = ({ sykmelding, ledetekster, nokkelopplysninger, type }) => {
    const html = nokkelopplysninger.map((rad, index1) => {
        return (<div className="rad-container" key={index1}>
            {
                rad.map((nokkelopplysning, index2) => {
                    return <StatusOpplysning key={index2} ledetekster={ledetekster} sykmelding={sykmelding} nokkelopplysning={nokkelopplysning} />;
                })
            }
        </div>);
    });
    return (
        <div className="panel blokk">
            <Varselstripe type={type}>
                <div>
                   {html}
               </div>
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
