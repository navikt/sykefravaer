import * as actiontyper from '../actions/actiontyper';
import { createReducer } from './createReducer';

const arbeidsgiverperiodeberegning = createReducer(
    actiontyper.HENT_ARBEIDSGIVERPERIODEBEREGNING_FEILET,
    actiontyper.HENTER_ARBEIDSGIVERPERIODEBEREGNING,
    actiontyper.ARBEIDSGIVERPERIODEBEREGNING_HENTET);

export default arbeidsgiverperiodeberegning;
