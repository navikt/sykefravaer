import React, { PropTypes } from 'react';
import StatusOpplysning from './StatusOpplysning';
import { Varselstripe } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt } from '../propTypes';

const StatusPanel = ({ sykmelding, nokkelopplysninger, type }) => {
    const varselprops = {
        type,
    };
    if (type === 'avbrutt') {
        varselprops.ikon = `${window.APP_SETTINGS.APP_ROOT}/img/svg/avbryt-sykmelding-roed.svg`;
    }
    const html = nokkelopplysninger.map((rad, index1) => {
        return (<div className="statusopplysninger js-rad" key={index1}>
            {
                rad.map((nokkelopplysning, index2) => {
                    return <StatusOpplysning key={index2} sykmelding={sykmelding} nokkelopplysning={nokkelopplysning} />;
                })
            }
        </div>);
    });
    return (
        <div className="panel panel--komprimert blokk">
            <Varselstripe {...varselprops}>
                <div>
                   {html}
               </div>
            </Varselstripe>
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: sykmeldingPt,
    type: PropTypes.string,
    nokkelopplysninger: PropTypes.array,
};

export default StatusPanel;
