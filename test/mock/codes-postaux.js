import 'isomorphic-fetch';  // needs to leak into global namespace for mocking
import mock from 'fetch-mock';


/**
 * Mocks calls to APICarto to always reply with fixed response.
 */
export function start() {
    mock.mock(`https://apicarto.sgmap.fr/codes-postaux/communes/${SINGLE_MATCH_POSTAL_CODE}`,
        [{"codeInsee":SINGLE_MATCH_INSEE_CODE,"nomCommune":"PARIS 11","codePostal":SINGLE_MATCH_POSTAL_CODE,"libelleAcheminement":"PARIS"}]);
    mock.mock(`https://apicarto.sgmap.fr/codes-postaux/communes/${MULTIPLE_MATCHES_POSTAL_CODE}`,
        MULTIPLE_MATCHES);
    mock.mock(`https://apicarto.sgmap.fr/codes-postaux/communes/${NO_MATCH_POSTAL_CODE}`, {
        status: 404,
        body: 'Not found',
    });
    mock.mock('https://apicarto.sgmap.fr/codes-postaux/communes/down', {
        throws: new Error('NO_INTERNET_CONN'),
    });
    mock.mock(/^https:\/\/apicarto\.sgmap\.fr\/codes-postaux\/communes\/.*[^0-9]/, {
        status: 400,
        body: 'Bad request',
    });


    console.log('APICarto responses are now fake');
}

/**
 * Stop mocking calls to APICarto.
 */
export function stop() {
    mock.restore();

    console.log('APICarto responses are not fake anymore');
}

export const NO_MATCH_POSTAL_CODE = '12333';

export const SINGLE_MATCH_POSTAL_CODE = '75011';
export const SINGLE_MATCH_INSEE_CODE = '75111';

export const MULTIPLE_MATCHES_POSTAL_CODE = '09000';
export const MULTIPLE_MATCHES = [{"codeInsee":"09013","nomCommune":"ARABAUX","codePostal":"09000","libelleAcheminement":"ARABAUX"},{"codeInsee":"09044","nomCommune":"BAULOU","codePostal":"09000","libelleAcheminement":"BAULOU"},{"codeInsee":"09049","nomCommune":"BENAC","codePostal":"09000","libelleAcheminement":"BENAC"},{"codeInsee":"09063","nomCommune":"LE BOSC","codePostal":"09000","libelleAcheminement":"LE BOSC"},{"codeInsee":"09066","nomCommune":"BRASSAC","codePostal":"09000","libelleAcheminement":"BRASSAC"},{"codeInsee":"09068","nomCommune":"BURRET","codePostal":"09000","libelleAcheminement":"BURRET"},{"codeInsee":"09093","nomCommune":"CELLES","codePostal":"09000","libelleAcheminement":"CELLES"},{"codeInsee":"09099","nomCommune":"COS","codePostal":"09000","libelleAcheminement":"COS"},{"codeInsee":"09121","nomCommune":"FERRIERES SUR ARIEGE","codePostal":"09000","libelleAcheminement":"FERRIERES SUR ARIEGE"},{"codeInsee":"09122","nomCommune":"FOIX","codePostal":"09000","libelleAcheminement":"FOIX"},{"codeInsee":"09130","nomCommune":"GANAC","codePostal":"09000","libelleAcheminement":"GANAC"},{"codeInsee":"09138","nomCommune":"L HERM","codePostal":"09000","libelleAcheminement":"L HERM"},{"codeInsee":"09174","nomCommune":"LOUBIERES","codePostal":"09000","libelleAcheminement":"LOUBIERES"},{"codeInsee":"09210","nomCommune":"MONTOULIEU","codePostal":"09000","libelleAcheminement":"MONTOULIEU"},{"codeInsee":"09234","nomCommune":"PRADIERES","codePostal":"09000","libelleAcheminement":"PRADIERES"},{"codeInsee":"09236","nomCommune":"PRAYOLS","codePostal":"09000","libelleAcheminement":"PRAYOLS"},{"codeInsee":"09264","nomCommune":"ST JEAN DE VERGES","codePostal":"09000","libelleAcheminement":"ST JEAN DE VERGES"},{"codeInsee":"09269","nomCommune":"ST MARTIN DE CARALP","codePostal":"09000","libelleAcheminement":"ST MARTIN DE CARALP"},{"codeInsee":"09272","nomCommune":"ST PAUL DE JARRAT","codePostal":"09000","libelleAcheminement":"ST PAUL DE JARRAT"},{"codeInsee":"09273","nomCommune":"ST PIERRE DE RIVIERE","codePostal":"09000","libelleAcheminement":"ST PIERRE DE RIVIERE"},{"codeInsee":"09293","nomCommune":"SERRES SUR ARGET","codePostal":"09000","libelleAcheminement":"SERRES SUR ARGET"},{"codeInsee":"09300","nomCommune":"SOULA","codePostal":"09000","libelleAcheminement":"SOULA"},{"codeInsee":"09329","nomCommune":"VERNAJOUL","codePostal":"09000","libelleAcheminement":"VERNAJOUL"}];
