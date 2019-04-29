import { createReducer } from '../../../reducers/createReducer';
import {
    HENTER_SM_SYKMELDINGER,
    HENT_SM_SYKMELDINGER_FEILET,
    SM_SYKMELDINGER_HENTET } from './smSykmeldingerActions';

const smSykmeldinger = createReducer(
    HENT_SM_SYKMELDINGER_FEILET,
    HENTER_SM_SYKMELDINGER,
    SM_SYKMELDINGER_HENTET,
    {
        henter: false,
        hentingFeilet: false,
        hentet: false,
        data: [],
    },
);

export default smSykmeldinger;
