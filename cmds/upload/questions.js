const questions = [
    {
        type: 'text',
        name: 'apiHost',
        message: 'Api Host (eg. origin-api-stg.unily.com):',
        validate: value => value && value.length > 0 ? true : false
    },
    {
        type: 'text',
        name: 'clientId',
        message: 'Client Id:',
        validate: value => value && value.length > 0 ? true : false
    },
    {
        type: 'text',
        name: 'clientSecret',
        message: 'Client Secret:',
        validate: value => value && value.length > 0 ? true : false
    }
];
module.exports.questions = questions;