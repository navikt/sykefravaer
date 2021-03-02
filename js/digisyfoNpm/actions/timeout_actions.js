import * as actiontyper from './actiontyper';

export const forlengInnloggetSesjon = () => {
    return {
        type: actiontyper.FORLENG_INNLOGGET_SESJON,
    };
};

export const snartUtlogget = () => {
    return {
        type: actiontyper.SNART_UTLOGGET,
    };
};

export const sjekkInnloggingssesjon = () => {
    return {
        type: actiontyper.SJEKK_INNLOGGINGSSESJON,
    };
};
