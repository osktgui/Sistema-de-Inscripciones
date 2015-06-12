'use strict';

var _ = require('lodash');
var Person = require('./Person.model');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('oAdSG7v4NJ-oJbTTWjZm1A');
// Get list of Persons
exports.index = function(req, res) {
  Person.find(function (err, Persons) {
    if(err) { return handleError(res, err); }
    /*var template_name = "confirmacion";
    var template_content = [{
            "name": "example name",
            "content": "example content"
        }];
    var message = {
        "html": "",
        "text": "",
        "subject": "Confirmación e Inscripción",
        "from_email": "luis@xurface.com",
        "from_name": "Luis Carlos Oscátegui",
        "to": [{
                "email": "luis@xurface.com",
                "name": "Oscátegui",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "message.reply@example.com"
        },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "global_merge_vars": [{
                "name": "merge1",
                "content": "merge1 content"
            }],
        "merge_vars": [{
                "rcpt": "recipient.email@example.com",
                "vars": [{
                        "name": "NOMBRE_COMPLETO",
                        "content": "Lorem ipsum loremi ipsum"
                    }]
            }],
        "tags": [
            "confirmacion-inscripcion"
        ],
        "subaccount": "luis",
        "metadata": {
            "website": "www.xurface.com"
        },
        "attachments": [{
                "type": "text/plain",
                "name": "myfile.txt",
                "content": "ZXhhbXBsZSBmaWxl"
            }],
        "images": [{
                "type": "image/png",
                "name": "IMAGECID",
                "content": "ZXhhbXBsZSBmaWxl"
            }]
    };
    var async = false;
    var send_at = Date.now;
    mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "send_at": send_at}, function(result) {
        console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
    */


    return res.json(200, Persons);
  });
};

// Get a single Person
exports.show = function(req, res) {
  Person.findById(req.params.id, function (err, Person) {
    if(err) { return handleError(res, err); }
    if(!Person) { return res.send(404); }
    return res.json(Person);
  });
};

// Creates a new Person in the DB.
exports.create = function(req, res) {
  Person.create(req.body, function(err, Person) {
    if(err) { return handleError(res, err); }
    console.log(req.body.email);


    return res.json(201, Person);
  });
};

// Updates an existing Person in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Person.findById(req.params.id, function (err, Person) {
    if (err) { return handleError(res, err); }
    if(!Person) { return res.send(404); }
    var updated = _.merge(Person, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Person);
    });
  });
};

// Deletes a Person from the DB.
exports.destroy = function(req, res) {
  Person.findById(req.params.id, function (err, Person) {
    if(err) { return handleError(res, err); }
    if(!Person) { return res.send(404); }
    Person.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
