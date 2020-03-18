import React from 'react';
import { Link } from 'react-router';

const svg = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB
ZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u
OiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBT
VkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzEx
LmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Ik91dGluZV9WZXJzaW9uIiB4bWxucz0iaHR0
cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8x
OTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIg
dmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1s
OnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNMTEuNSwxQzUuMTU5LDEsMCw2LjE1
OSwwLDEyLjVDMCwxOC44NDEsNS4xNTksMjQsMTEuNSwyNFMyMywxOC44NDEsMjMsMTIuNUMyMyw2
LjE1OSwxNy44NDEsMSwxMS41LDF6IE0xMS41LDIzDQoJCUM1LjcxLDIzLDEsMTguMjksMSwxMi41
QzEsNi43MSw1LjcxLDIsMTEuNSwyUzIyLDYuNzEsMjIsMTIuNUMyMiwxOC4yOSwxNy4yOSwyMywx
MS41LDIzeiIvPg0KCTxwYXRoIGQ9Ik0xNC41LDE5SDEydi04LjVjMC0wLjI3Ni0wLjIyNC0wLjUt
MC41LTAuNWgtMkM5LjIyNCwxMCw5LDEwLjIyNCw5LDEwLjVTOS4yMjQsMTEsOS41LDExSDExdjhI
OC41DQoJCUM4LjIyNCwxOSw4LDE5LjIyNCw4LDE5LjVTOC4yMjQsMjAsOC41LDIwaDZjMC4yNzYs
MCwwLjUtMC4yMjQsMC41LTAuNVMxNC43NzYsMTksMTQuNSwxOXoiLz4NCgk8Y2lyY2xlIGN4PSIx
MSIgY3k9IjYuNSIgcj0iMSIvPg0KPC9nPg0KPC9zdmc+DQo=`;

const svgFilled = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB
ZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u
OiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBT
VkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzEx
LmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkZpbGxlZF9WZXJzaW9uIiB4bWxucz0iaHR0
cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8x
OTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIg
dmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1s
OnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTEuNSwxQzUuMTU4LDEsMCw2LjE1OCwwLDEy
LjVTNS4xNTgsMjQsMTEuNSwyNEMxNy44NDEsMjQsMjMsMTguODQyLDIzLDEyLjVTMTcuODQxLDEs
MTEuNSwxeiBNMTEsNmMwLjU1MSwwLDEsMC40NDgsMSwxDQoJYzAsMC41NTMtMC40NDksMS0xLDFj
LTAuNTUzLDAtMS0wLjQ0Ny0xLTFDMTAsNi40NDgsMTAuNDQ3LDYsMTEsNnogTTE0LjUsMjBoLTZD
OC4yMjQsMjAsOCwxOS43NzYsOCwxOS41UzguMjI0LDE5LDguNSwxOUgxMXYtOA0KCUg5LjVDOS4y
MjQsMTEsOSwxMC43NzYsOSwxMC41UzkuMjI0LDEwLDkuNSwxMGgyYzAuMjc1LDAsMC41LDAuMjI0
LDAuNSwwLjVWMTloMi41YzAuMjc1LDAsMC41LDAuMjI0LDAuNSwwLjVTMTQuNzc1LDIwLDE0LjUs
MjB6Ig0KCS8+DQo8L3N2Zz4NCg==`;

const KoronaLink = () => {
    return (
        <Link
            style={{ marginBottom: '2rem' }}
            className="peker"
            href={`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`}
            to={`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`}>
            <div className="peker__ikon-korona">
                <img
                    className="peker__ikonBilde peker__ikonBilde--standard"
                    src={svg}
                    alt="Egensykmelding"
                />
                <img
                    className="peker__ikonBilde peker__ikonBilde--hover"
                    src={svgFilled}
                    alt="Egensykmelding"
                />
            </div>
            <div className="peker__innhold">
                <h2 className="peker__tittel">Egenerklæring som følge av koronavirus</h2>
            </div>
        </Link>
    );
};

export default KoronaLink;
