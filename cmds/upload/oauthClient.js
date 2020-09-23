const ClientOAuth2 = require('client-oauth2');
const routes = require("./routes");
const scopes = require("./scopes");
const settings = require("../settings");

const fetch = require('node-fetch');
const url = require('url');

const internal = {
    client: undefined,
    code: ""
};
const service = {
    authorize: authorize,
    uploadJs: uploadJs,
    putDocumentTypes: putDocumentTypes
};

function createClient() {
    settings.load();
    const client = new ClientOAuth2({
        clientId: settings.options.clientId,
        clientSecret: settings.options.clientSecret,
        accessTokenUri: routes.authorization.tokenUrl(settings.options.apiHost),
        scopes: [scopes.contentManagement]
    });
    internal.client = client;

}

async function authorize() {
    if (!internal.client) {
        createClient();
    }
    const token = await internal.client.credentials.getToken();
    internal.code = token.accessToken;
    return token;
}

function validate() {
    if (!internal.code) {
        console.error("Cant continue without a token. ");
        return false;
    }
    // if (!files) {
    //     console.error("No files");
    //     return false;
    // }
    return true;
}

async function putDocumentTypes() {
    if (!validate()) {
        return;
    }

    const loadDocumentTypeFiles = require("./documentTypes");
    const documentTypes = loadDocumentTypeFiles();

    console.log(`Create/Update Documents: ${documentTypes.length}`);
    for (let i = 0; i < documentTypes.length; i++) {
        const documentType = documentTypes[i];
        console.log(`${i+1}): ${documentType.name} (alias:${documentType.alias})`);
        try {
            await makeRequest(documentType).catch(function (e) {
                console.error(e);
                throw e;
            });
        } catch (er) {
            console.error("Could not create document type");
            console.error(er);
            throw "Could not create document type";
        }
    }

    function makeRequest(body) {
        const host = settings.options.apiHost;
        const route = routes.documentTypes.PUT();

        const bodyContent = JSON.stringify(body);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + internal.code
        };
        const promise = new Promise((success, error) => {
            const callUrl = url.resolve(host.startsWith("https") ? host : `https://${host}`, route);

            fetch(callUrl, {
                method: "PUT",
                body: bodyContent,
                headers: headers
            }).then(async res => {
                //console.log(res.ok);
                console.log(res.status);
                console.log(res.statusText);

                switch (res.status) {
                    case 500:
                    case 400:
                    case 404:
                    case 403:
                        debugger
                        const errorText = await res.text();
                        console.error(errorText);
                        error(errorText);
                        break;
                    default:
                        const text = await res.text();
                        success(text);
                        return;
                }
            }, (fail) => {
                debugger
                console.log("error", fail);
            });
        });

        return promise;
    }
}


async function uploadJs() {
    if (!validate()) {
        return;
    }

    const getFiles = require("./files");
    const fileJson = getFiles();

    //const requests = fileJson.map((item) => {
    var request = makeRequest(fileJson);
    var ticker = setTimeout(() => {
        console.log(".")
    }, 1000);

    const results = await Promise.all([request]).then(() => {
        clearTimeout(ticker);
    });

    return;

    function makeRequest(json) {
        const host = settings.options.apiHost;
        const route = routes.scripts.PUT();
        console.log(`Upload: ${json.map(e=> e.path).join(",")}`);

        const body = JSON.stringify(json);
        const headers = {
            'Content-Type': 'application/json',
            //'Content-Length': body.length,
            'Authorization': "Bearer " + internal.code // token,
        };
        const promise = new Promise((success, error) => {
            const callUrl = url.resolve(host.startsWith("https") ? host : `https://${host}`, route);
            //console.log(`callUrl: ${callUrl} | host: ${host} | route:${route} | code:${internal.code}`);

            fetch(callUrl, {
                method: "PUT",
                body: body,
                headers: headers
            }).then(res => {
                //console.log(res.ok);
                console.log(res.status);
                console.log(res.statusText);
                success();
            });
        });

        return promise;
    }
}

module.exports = service;