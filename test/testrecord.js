let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
var request = require('supertest');

describe('Record API', () => {

  describe('POST /records', () => {
      it('should return a results when all params are provided', async (done) => {
        request(server)
        .post('records')
        .send({
          startDate: '2016-01-26',
          endDate: '2019-01-26',
          minCount: 2700,
          maxCount: 2900,
        })
        .expect(200);
      done();
      });
      it("should not give a records when date and count params are not provided", async (done) =>  {
        request(server)
        .post('records')
        .send({
          })
        .expect(400);
        done();
      });
      it("should not give a records when  count params are not provided", async (done) =>  {
            request(server)
            .post('records')
            .send({
              startDate: '2016-01-26',
              endDate: '2019-01-26'
             })
            .expect(400);
            done();
       });
       it("should not give a records when  date params are not provided", async (done) =>  {
            request(server)
            .post('records')
            .send({
              minCount: 2700,
              maxCount: 2900
             })
            .expect(400);
            done();
        });
        it("should send error with array if there is no records", async (done) =>  {
            request(server)
            .post('records')
            .send({
                startDate: '2016-11-01',
                endDate: '2016-12-01',
                minCount: 1000,
                maxCount: 3000
             })
            .expect(404);
            done();
          });
          it("should send  404 error  if invalid date format", async (done) =>  {
            request(server)
            .post('records')
            .send({
                startDate: 'sddsfsdf',
                endDate: 'dsdfd',
                minCount: 1000,
                maxCount: 3000
             })
            .expect(404);
            done();
          });
          it("should send  404 error  if invalid count params format", async (done) =>  {
            request(server)
            .post('records')
            .send({
                startDate: '2016-11-01',
                endDate: '2016-12-01',
                minCount: 'mincount',
                maxCount: 'maxcount'
             })
            .expect(404);
            done();
          });

  });
      


});    