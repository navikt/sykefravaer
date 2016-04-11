import React from 'react';
import { getPathByKey } from '../routers/paths.js';
import { Link } from 'react-router';

function replaceParam(path, params) {
    let p = '';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            p = path.replace(`:${key}`, params[key]);
        }
    }
    return p;
}

export function getSti(path, params) {
    let paths = path.split('/');
    paths = paths.map((pth, idx) => {
        const smulePath = getPathByKey(pth);

        return {
            tittel: smulePath.tittel,
            erKlikkbar: (idx + 1 < paths.length),
            sti: replaceParam(smulePath.fullPath, params),
        };
    });
    return paths;
}

const Brodsmuler = (routePath, routeParams) => {
    return (<nav role="navigation" className="brodsmuler">
        {getSti(routePath, routeParams).map((lnk, idx) => {
            return (lnk.erKlikkbar ?
                <Link key={idx} to={lnk.sti}>{lnk.tittel}</Link> :
                <span key={idx}>{lnk.tittel}</span>);
        })}</nav>);
};

export default Brodsmuler;
