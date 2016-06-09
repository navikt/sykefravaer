export function setMilepaeler(data = []) {
    return {
        type: 'SET_MILEPÆLER',
        data,
    };
}

export function apneMilepaeler(milepaelIder) {
    return {
        type: 'ÅPNE_MILEPÆLER',
        milepaelIder,
    };
}

export function setMilepaeldata(milepaelId, data) {
    return {
        type: 'SET_MILEPÆLDATA',
        milepaelId, 
        data,
    };
}
