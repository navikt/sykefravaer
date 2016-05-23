function replace(str, replacements) {
    return str.replace(/%\w+%/g, (all) => {
        return `${replacements[all]}` || all;
    });
}

export function getHtmlLedetekst(key, labels, replacements) {
    let label = labels[key];
    if (Object.keys(labels).length === 0) {
        label = '';
    }
    if (!label) {
        label = `${key} [MANGLER LEDETEKST]`;
    }
    if (replacements) {
        label = replace(label, replacements);
    }
    return { __html: label };
}

export function getLedetekst(key, labels = {}, replacements) {
    const label = labels[key];
    if (Object.keys(labels).length === 0) {
        return '';
    }
    if (!label) {
        return `${key} [MANGLER LEDETEKST]`;
    }
    if (!replacements) {
        return label;
    }
    return replace(label, replacements);
}
