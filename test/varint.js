var BN = require('../lib/bn');
var should = require('chai').should();
var BufR = require('../lib/bufr');
var BufW = require('../lib/bufw');
var Varint = require('../lib/varint');

describe('Varint', function() {

  it('should make a new varint', function() {
    var buf = new Buffer('00', 'hex');
    var varint = new Varint(buf);
    should.exist(varint);
    varint.buf.toString('hex').should.equal('00');
    varint = Varint(buf);
    should.exist(varint);
    varint.buf.toString('hex').should.equal('00');

    //various ways to use the constructor
    Varint(Varint(0).toBuffer()).toNumber().should.equal(0);
    Varint(0).toNumber().should.equal(0);
    Varint(BN(0)).toNumber().should.equal(0);

    //varints can have multiple buffer representations
    Varint(0).toNumber().should.equal(Varint(new Buffer([0xFD, 0, 0])).toNumber())
    Varint(0).toBuffer().toString('hex').should.not.equal(Varint().fromBuffer(new Buffer([0xFD, 0, 0])).toBuffer().toString('hex'))
  });

  describe('#set', function() {
    
    it('should set a buffer', function() {
      var buf = new Buffer('00', 'hex');
      var varint = Varint().set({buf: buf});
      varint.buf.toString('hex').should.equal('00');
      varint.set({});
      varint.buf.toString('hex').should.equal('00');
    });

  });

  describe('#fromJSON', function() {
    
    it('should set a buffer', function() {
      var buf = BufW().writeVarintNum(5).concat();
      var varint = Varint().fromJSON(buf.toString('hex'));
      varint.toNumber().should.equal(5);
    });

  });

  describe('#toJSON', function() {
    
    it('should return a buffer', function() {
      var buf = BufW().writeVarintNum(5).concat();
      var varint = Varint().fromJSON(buf.toString('hex'));
      varint.toJSON().should.equal('05');
    });

  });

  describe('#fromBuffer', function() {
    
    it('should set a buffer', function() {
      var buf = BufW().writeVarintNum(5).concat();
      var varint = Varint().fromBuffer(buf);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromBufR', function() {
    
    it('should set a buffer reader', function() {
      var buf = BufW().writeVarintNum(5).concat();
      var br = BufR(buf);
      var varint = Varint().fromBufR(br);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromBN', function() {
    
    it('should set a number', function() {
      var varint = Varint().fromBN(BN(5));
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromNumber', function() {
    
    it('should set a number', function() {
      var varint = Varint().fromNumber(5);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#toBuffer', function() {
    
    it('should return a buffer', function() {
      buf = BufW().writeVarintNum(5).concat();
      var varint = Varint(buf);
      varint.toBuffer().toString('hex').should.equal(buf.toString('hex'));
    });

  });

  describe('#toBN', function() {
    
    it('should return a buffer', function() {
      var varint = Varint(5);
      varint.toBN().toString().should.equal(BN(5).toString());
    });

  });

  describe('#toNumber', function() {
    
    it('should return a buffer', function() {
      var varint = Varint(5);
      varint.toNumber().should.equal(5);
    });

  });

});
