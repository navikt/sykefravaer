import React from 'react';
import PropTypes from 'prop-types';
import StatusOpplysning from './StatusOpplysning';
import { sykmelding as sykmeldingPt } from '../propTypes';

const Nokkelopplysninger = ({ nokkelopplysninger, sykmelding }) => {
    return (
        nokkelopplysninger.map((rad, index1) => {
            return (
                <div className="statusopplysninger js-rad" key={index1}>
                    {
                        rad.map((nokkelopplysning, index2) => {
                            return (<StatusOpplysning
                                key={index2}
                                sykmelding={sykmelding}
                                nokkelopplysning={nokkelopplysning} />);
                        })
                    }
                </div>
            );
        },
        )
    );
};

Nokkelopplysninger.propTypes = {
    nokkelopplysninger: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    sykmelding: sykmeldingPt,
};

const StatusPanel = ({ sykmelding, nokkelopplysninger, type, children }) => {
    return (<div className="panel panel--komprimert blokk">
        <Nokkelopplysninger nokkelopplysninger={nokkelopplysninger} sykmelding={sykmelding} />
        {children}
    </div>);
};

StatusPanel.propTypes = {
    sykmelding: sykmeldingPt,
    type: PropTypes.string,
    nokkelopplysninger: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default StatusPanel;
