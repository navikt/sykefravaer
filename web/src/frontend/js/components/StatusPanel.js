import React from 'react';
import PropTypes from 'prop-types';
import { Varselstripe } from 'digisyfo-npm';
import StatusOpplysning from './StatusOpplysning';
import { sykmelding as sykmeldingPt } from '../propTypes';

const Nokkelopplysninger = ({ nokkelopplysninger, sykmelding }) => {
    return (
        nokkelopplysninger.map((rad, index1) => {
            return (
                <div className="" key={index1}>
                    <div className="statusopplysninger js-rad">
                        {
                            rad.map((nokkelopplysning, index2) => {
                                return (<StatusOpplysning
                                    key={index2}
                                    sykmelding={sykmelding}
                                    nokkelopplysning={nokkelopplysning} />);
                            })
                        }
                    </div>
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
    const varselprops = {
        type,
    };
    if (type === 'avbrutt') {
        varselprops.ikon = `${window.APP_SETTINGS.APP_ROOT}/img/svg/avbryt-sykmelding-roed.svg`;
    }

    return (
        <div className="panel panel--komprimert blokk">
            <Varselstripe {...varselprops}>
                <Nokkelopplysninger nokkelopplysninger={nokkelopplysninger} sykmelding={sykmelding} />
                {children}
            </Varselstripe>
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: sykmeldingPt,
    type: PropTypes.string,
    nokkelopplysninger: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default StatusPanel;
