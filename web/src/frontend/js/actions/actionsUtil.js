export const SOM_POST = { credentials: 'same-origin', method: 'POST', headers: { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST') }};

const getCookie = (name) => {
    var re = new RegExp(name + '=([^;]+)');
    var match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
