export const visFeilmelding = (skjemaData, field) => {
    if (!skjemaData || !skjemaData.fields || !skjemaData.fields[field] || !skjemaData.syncErrors || !skjemaData.syncErrors[field]) {
        return false;
    } else {
        for (const key in skjemaData.fields[field]) {
            if (skjemaData.fields[field][key].touched === true) {
                return true;
            }
        }
    }
    return skjemaData.fields[field].touched && typeof skjemaData.syncErrors[field] === 'string';
}

export const getFeilmelding = (skjemaData, field) => {
    return skjemaData && skjemaData.syncErrors && typeof skjemaData.syncErrors[field] === 'string' ? skjemaData.syncErrors[field] : '';
}

