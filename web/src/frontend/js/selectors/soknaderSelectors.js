import { SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import { FREMTIDIG, NY } from '../enums/soknadstatuser';

export const erForsteSoknad = (state) => {
    const selvstendigSoknader = state.soknader.data.filter((s) => {
        return s.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    })
    return selvstendigSoknader.filter((s) => {
        return s.status === NY || s.status === FREMTIDIG;
    }).length === selvstendigSoknader.length;
};
