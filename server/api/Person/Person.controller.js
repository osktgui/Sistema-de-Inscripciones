'use strict';

var _ = require('lodash');
var Person = require('./Person.model');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('oAdSG7v4NJ-oJbTTWjZm1A');
//var mandrill_client = new mandrill.Mandrill('M0z-mfYNNN4Kp9GwRGBNlA');
// Get list of Persons
exports.index = function(req, res) {
  Person.find(function (err, Persons) {
    if(err) { return handleError(res, err); }

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
    //console.log(req.body.email);
    send_email_mandrill(req.body.fullname, req.body.email, req.body.dni);

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

function send_email_mandrill(fullname, email, dni){
  var template_name = "confirmacion";
  var template_content = [{
          "name": "NOMBRE_COMPLETO",
          "content": "Lorem ipsum loremi ipsum"
      },{
              "name": "DNI",
              "content": dni
          }];
  var message = {
      "subject": "Confirmación e Inscripción",
      "from_email": "startupweekendhuancayo@gmail.com",
      "from_name": "Equipo Organizador",
      "to": [{
              "email": email,
              "name": fullname,
              "type": "to"
          },{
                  "email": "startupweekendhuancayo@gmail.com",
                  "name": "Startup Weekend Huancayo",
                  "type": "cc"
              }],
      "global_merge_vars": [{
              "name": "NOMBRE_COMPLETO",
              "content": fullname
          },{
                  "name": "DNI",
                  "content": dni
              }]

        /*  ,
      "attachments": [{
              "type": "text/plain",
              "name": "myfile.txt",
              "content": "ZXhhbXBsZSBmaWxl"
          }
        ]*/
  };
  var async = false;
  var ip_pool = null;
  var send_at = null;
  mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool,"send_at": send_at}, function(result) {
      console.log(result);
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
}
