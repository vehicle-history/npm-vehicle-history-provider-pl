var rewire = require('rewire');
var index = rewire('../index');
var options = require('config');
var chai = require('chai');
var should = chai.should();

var body = '';

describe('index test', function () {

  index.__set__({
    client: {
      getVehicleHistory: function (searchCarRequest, options, callback) {
        searchCarRequest.plate.should.equal('pwr 17wq');
        searchCarRequest.vin.should.equal('ABC123456789DEF');
        searchCarRequest.firstRegistrationDate.should.equal('11.11.2000');

        return callback(null, body);
      }
    },
    parser: {
      generateReport: function (content, searchCarRequest, options, callback) {
        content.should.equal(body);
        searchCarRequest.plate.should.equal('pwr 17wq');
        searchCarRequest.vin.should.equal('ABC123456789DEF');
        searchCarRequest.firstRegistrationDate.should.equal('11.11.2000');

        return callback(null, {});
      }
    }
  });

  it('should call checkVehicleHistory ', function (done) {

    var plate = 'pwr 17wq';
    var vin = 'ABC123456789DEF';
    var firstRegistrationDate = '11.11.2000';

    index.checkVehicleHistory(plate, vin, firstRegistrationDate, options, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      done();
    });
  });
});