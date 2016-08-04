import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBoble from './TidslinjeBoble.js';
import { toDatePrettyPrint } from '../utils/datoUtils.js';

const Ikon = ({ type }) => {
    const status = {};

    switch (type) {
        case 'FØRSTE_SYKMELDINGSDAG': {
            status.ikonClassName = 'hendelse-ikon-start';
            status.ikon = 'plaster';
            break;
        }
        case 'AKTIVITETSKRAV_VARSEL': {
            status.ikonClassName = 'hendelse-ikon-varsel';
            status.ikon = 'tidslinje-utropstegn';
            break;
        }
        case 'TID': {
            status.ikonClassName = 'hendelse-ikon-klokke';
            status.ikon = 'tidslinje-klokke';
            break;
        }
        default: {
            status.ikonClassName = 'hendelse-ikon-sirkel';
            status.ikon = 'tidslinje-sirkel';
            break;
        }
    }

    return (<div className={`hendelse-ikon ${status.ikonClassName}`}>
            <img className="hendelse-img" src={`/sykefravaer/img/svg/${status.ikon}.svg`} alt="" />
            <img className="hendelse-img-hoykontrast" src={`/sykefravaer/img/svg/${status.ikon}-highcontrast.svg`} alt="" />
        </div>);
};

Ikon.propTypes = {
    type: PropTypes.string,
};

const Status = ({ children }) => {
    return (<div className="hendelse-status">
        {children}
    </div>);
};

Status.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

const Innhold = ({ children }) => {
    return (<div className="hendelse-innhold">
        {children}
    </div>);
};

Innhold.propTypes = {
    children: PropTypes.object,
};

const Tittel = ({ tekst }) => {
    return (<div className="tidslinje-tittel">
        <h2>{tekst}</h2>
    </div>);
};

Tittel.propTypes = {
    tekst: PropTypes.string,
};

const Hendelse = (props) => {
    return (<div className="hendelse">
        <Status type={props.type}>
            <Ikon type={props.type} />
        </Status>
        <Innhold>
            {
                (() => {
                    switch (props.type) {
                        case 'TITTEL':
                        case 'TID': {
                            return <Tittel tekst={getLedetekst(`${props.tekstkey}`, props.ledetekster)} />;
                        }
                        case 'FØRSTE_SYKMELDINGSDAG': {
                            return (<Tittel tekst={getLedetekst(`${props.tekstkey}`, props.ledetekster, {
                                '%DATO%': toDatePrettyPrint(props.data.startdato),
                            })} />);
                        }
                        default: {
                            return <TidslinjeBoble {...props} />;
                        }
                    }
                })()
            }
        </Innhold>
    </div>);
};

Hendelse.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    type: PropTypes.string,
    tekstkey: PropTypes.string,
    data: PropTypes.object,
};

export default Hendelse;
