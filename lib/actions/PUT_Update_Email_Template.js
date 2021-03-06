/**
 * Auto-generated action file for "Zuora API Reference" API.
 *
 * Generated at: 2019-05-07T14:45:12.643Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / zuora-com-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'PUT_Update_Email_Template'
 * Endpoint Path: '/notifications/email-templates/{id}'
 * Method: 'put'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "Authorization",
    "Zuora-Track-Id",
    "Zuora-Entity-Ids",
    "id"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "Authorization": "Authorization",
    "Zuora_Track_Id": "Zuora-Track-Id",
    "Zuora_Entity_Ids": "Zuora-Entity-Ids",
    "id": "id",
    "active": "active",
    "bccEmailAddress": "bccEmailAddress",
    "ccEmailAddress": "ccEmailAddress",
    "ccEmailType": "ccEmailType",
    "description": "description",
    "emailBody": "emailBody",
    "emailSubject": "emailSubject",
    "encodingType": "encodingType",
    "fromEmailAddress": "fromEmailAddress",
    "fromEmailType": "fromEmailType",
    "fromName": "fromName",
    "isHtml": "isHtml",
    "name": "name",
    "replyToEmailAddress": "replyToEmailAddress",
    "replyToEmailType": "replyToEmailType",
    "toEmailAddress": "toEmailAddress",
    "toEmailType": "toEmailType",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'application/json; charset=utf-8';

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};

    let callParams = {
        spec: spec,
        operationId: 'PUT_Update_Email_Template',
        pathName: '/notifications/email-templates/{id}',
        method: 'put',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}