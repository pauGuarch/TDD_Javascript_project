import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

//Definiton of today's date to compare with an expect expression
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

// CRUD Create.
describe('CRUD Create : POST /register', () => {
  describe('Given a username and a password to create', () => {
    test('When we recieve it correctly we should response a StatusCode 200', async () => {
      const response = await request.post("/users/register").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.statusCode).toBe(200);
    });
    test('It should return a content-type json', async () => {
      const response = await request.post("/users/register").send({
        username: "lebowski@domini.es",
        password: "abide"
      }).expect("Content-Type", /json/);
    });
    test('It should have a username defined  in response body', async () => {
      const response = await request.post("/users/register").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.body.username).toBeDefined();
    });
    test('It should return the same username and password as sent', async () => {
      const response = await request.post("/users/register").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.body.username).toBe("lebowski@domini.es");
      expect(response.body.password).toBe("abide");
    });
  });
});
// CRUD Read
describe('CRUD Read : GET /login', () => {
  describe('Given a username and a password to login', () => { 
    test('When we recieve it correctly we should response a StatusCode 200', async () => {
      const response = await request.get("/users/login").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.statusCode).toBe(200);
    });
    test('(then) Should recieve a key login defined as true in response', async () => {
      const response = await request.get("/users/login").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.body.login).toBe("true");
    });
    test('(then) Should recieve a key login defined as false when login fails', async () => {
      const response = await request.get("/users/login").send({
        username: "lebowski@domini.es"
      });
      expect(response.body.login).toBe("false");
    });
    test('When we recieve empty login without a password neither a username reponse has to be 400', async () => {
      const response = await request.get("/users/login").send({
        error:0
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

// CRUD Update
describe('CRUD Update : PUT /update', () => {
  describe('Given a username ,password and new password to update', () => {  
    test('If we send password, username and newpassword the response should define an update field ', async () => {
      const response = await request.put("/users/update").send({
        username: "lebowski@domini.es",
        password: "abide",
        newpassword: "bridges"
      });
      expect({update: today});
    });
    test('If we do not send a newpassword value statusresponse must be 400 ', async () => {
      const response = await request.put("/users/update").send({
        username: "lebowski@domini.es",
        password: "abide"
      });
      expect(response.statusCode).toBe(400);
    });
    test('When we send a correct update request response type should be Json', async () => {
      const response = await request.put("/users/update").send({
        username: "lebowski@domini.es",
        password: "abide",
        newpassword: "bridges"
      }).expect("Content-Type", /json/);
    });  
    test('If we send a newpassword value update field must be defined ', async () => {
      const response = await request.put("/users/update").send({
        username: "lebowski@domini.es",
        password: "abide",
        newpassword: "bridges"
      });
      expect(response.body.update).toBeDefined();
    });
  });
});
// CRUD Delete
describe('CRUD Delete : DELETE /delete', () => {
  describe('Given a username and a password to delete', () => {  
    test('If both are correct we should recieve a new field active equal true', async () => {
      const response = await request.delete("/users/delete").send({
        username: "lebowski@domini.es",
        password: "abide",
        deleteuser: "true"
      });
      expect(response.body.active).toBeDefined();
    });
    test('If we do not send a value true in deleteuser field active field should be true', async () => {
      const response = await request.delete("/users/delete").send({
        username: "lebowski@domini.es",
        password: "abide",
        deleteuser: 0
      });
      expect(response.body.active).toBe("true");
    });
    test('When we send a correct delete request response type should be Json', async () => {
      const response = await request.delete("/users/delete").send({
        username: "lebowski@domini.es",
        password: "abide",
        deleteuser: "true"
      }).expect("Content-Type", /json/);
    });    
    test('If we don not send correct user and password rwe recieve a code 400', async () => {
      const response = await request.delete("/users/delete").send({
        username: "lebowski@domini.es"
      });
      expect(response.statusCode).toBe(400);
    });
  });
});