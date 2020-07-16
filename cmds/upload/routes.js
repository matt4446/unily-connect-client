const auth = {
    tokenUrl: (apiHost) => `https://${apiHost}/connect/token`
};
const scripts = "/api/v1/scripts";
const documentTypeRoute = "/api/v1/document-types";
const routes ={
    authorization : auth,
    scripts: {
        "GET" : () => scripts,
        "PUT" : () => scripts,
        "POST" : () => scripts,
        "DELETE": () => scripts,
    },
    styles: {

    },
    documentTypes: {
        "GET" : (alias) => `${documentTypeRoute}/${alias}`,
        "POST": () => documentTypeRoute,
        "PUT": () => documentTypeRoute,
        "DELETE": (alias) => `${documentTypeRoute}/${alias}`
    }

};

module.exports = routes;