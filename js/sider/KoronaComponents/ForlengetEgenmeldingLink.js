import React from 'react';
import { Link } from 'react-router';

const svg = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB
ZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u
OiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBT
VkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzEx
LmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Ik91dGxpbmVfVmVyc2lvbiIgeG1sbnM9Imh0
dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcv
MTk5OS94bGluayIgeD0iMHB4Ig0KCSB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgi
IHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHht
bDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMy41LDI0aC0yM0Mw
LjIyNCwyNCwwLDIzLjc3NiwwLDIzLjV2LTIzQzAsMC4yMjQsMC4yMjQsMCwwLjUsMGgyM0MyMy43
NzYsMCwyNCwwLjIyNCwyNCwwLjV2MjMNCgkJCUMyNCwyMy43NzYsMjMuNzc2LDI0LDIzLjUsMjR6
IE0xLDIzaDIyVjFIMVYyM3oiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGQ9Ik01LjUsMTBjLTAu
MTI4LDAtMC4yNTYtMC4wNDktMC4zNTQtMC4xNDZsLTItMmMtMC4xOTUtMC4xOTUtMC4xOTUtMC41
MTIsMC0wLjcwN3MwLjUxMi0wLjE5NSwwLjcwNywwTDUuNSw4Ljc5Mw0KCQkJbDQuNjQ2LTQuNjQ2
YzAuMTk1LTAuMTk1LDAuNTEyLTAuMTk1LDAuNzA3LDBzMC4xOTUsMC41MTIsMCwwLjcwN2wtNSw1
QzUuNzU2LDkuOTUxLDUuNjI4LDEwLDUuNSwxMHoiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGQ9
Ik01LjUsMTljLTAuMTI4LDAtMC4yNTYtMC4wNDktMC4zNTQtMC4xNDZsLTItMmMtMC4xOTUtMC4x
OTUtMC4xOTUtMC41MTIsMC0wLjcwN3MwLjUxMi0wLjE5NSwwLjcwNywwTDUuNSwxNy43OTMNCgkJ
CWw0LjY0Ni00LjY0NmMwLjE5NS0wLjE5NSwwLjUxMi0wLjE5NSwwLjcwNywwczAuMTk1LDAuNTEy
LDAsMC43MDdsLTUsNUM1Ljc1NiwxOC45NTEsNS42MjgsMTksNS41LDE5eiIvPg0KCTwvZz4NCgk8
Zz4NCgkJPHBhdGggZD0iTTIwLjUsOWgtOEMxMi4yMjQsOSwxMiw4Ljc3NiwxMiw4LjVTMTIuMjI0
LDgsMTIuNSw4aDhDMjAuNzc2LDgsMjEsOC4yMjQsMjEsOC41UzIwLjc3Niw5LDIwLjUsOXoiLz4N
Cgk8L2c+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMC41LDE4aC04Yy0wLjI3NiwwLTAuNS0wLjIyNC0w
LjUtMC41czAuMjI0LTAuNSwwLjUtMC41aDhjMC4yNzYsMCwwLjUsMC4yMjQsMC41LDAuNVMyMC43
NzYsMTgsMjAuNSwxOHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==`;

const svgFilled = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB
ZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u
OiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBT
VkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzEx
LmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkZpbGxlZF9WZXJzaW9uIiB4bWxucz0iaHR0
cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8x
OTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIg
dmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1s
OnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMjMuNSwwaC0yM0MwLjIyNCwwLDAsMC4yMjQs
MCwwLjV2MjNDMCwyMy43NzYsMC4yMjQsMjQsMC41LDI0aDIzYzAuMjc2LDAsMC41LTAuMjI0LDAu
NS0wLjV2LTIzQzI0LDAuMjI0LDIzLjc3NiwwLDIzLjUsMA0KCXogTTEwLjg1NCwxMy44NTRsLTUs
NUM1Ljc1NiwxOC45NTEsNS42MjgsMTksNS41LDE5cy0wLjI1Ni0wLjA0OS0wLjM1NC0wLjE0Nmwt
Mi0yYy0wLjE5NS0wLjE5NS0wLjE5NS0wLjUxMiwwLTAuNzA3DQoJczAuNTEyLTAuMTk1LDAuNzA3
LDBMNS41LDE3Ljc5M2w0LjY0Ni00LjY0NmMwLjE5NS0wLjE5NSwwLjUxMi0wLjE5NSwwLjcwNyww
UzExLjA0OSwxMy42NTgsMTAuODU0LDEzLjg1NHogTTEwLjg1NCw0LjM1NGwtNSw1DQoJQzUuNzU2
LDkuNDUxLDUuNjI4LDkuNSw1LjUsOS41UzUuMjQ0LDkuNDUxLDUuMTQ2LDkuMzU0bC0yLTJjLTAu
MTk1LTAuMTk1LTAuMTk1LTAuNTEyLDAtMC43MDdzMC41MTItMC4xOTUsMC43MDcsMEw1LjUsOC4y
OTMNCglsNC42NDYtNC42NDZjMC4xOTUtMC4xOTUsMC41MTItMC4xOTUsMC43MDcsMFMxMS4wNDks
NC4xNTgsMTAuODU0LDQuMzU0eiBNMjAuNSwxOGgtOGMtMC4yNzYsMC0wLjUtMC4yMjQtMC41LTAu
NQ0KCXMwLjIyNC0wLjUsMC41LTAuNWg4YzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjVTMjAuNzc2
LDE4LDIwLjUsMTh6IE0yMC41LDloLThDMTIuMjI0LDksMTIsOC43NzYsMTIsOC41UzEyLjIyNCw4
LDEyLjUsOGg4DQoJQzIwLjc3Niw4LDIxLDguMjI0LDIxLDguNVMyMC43NzYsOSwyMC41LDl6Ii8+
DQo8L3N2Zz4NCg==`;

const ForlengetEgenmeldingLink = () => {
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
                    alt="Egenmelding"
                />
                <img
                    className="peker__ikonBilde peker__ikonBilde--hover"
                    src={svgFilled}
                    alt="Egenmelding"
                />
            </div>
            <div className="peker__innhold">
                <h2 className="peker__tittel">Opprettingsskjema for forlenget egenmelding</h2>
            </div>
        </Link>
    );
};

export default ForlengetEgenmeldingLink;
