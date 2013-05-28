/**
 * Parity Name System.
 *
 * @auther Gardner <gardner@invulnerable.org>
 * @this {Pns}
 * @constructor
 * @version 0.0.1
 */
function Pns(){
	this.passPhrase = ""
	this.keyPair = $.jStorage.get("keypair", null)
	this.keySize = 1024
}		

/**
 * Loads and return the keypair
 * @returns keypair
 */
Pns.prototype.getKeyPair = function(){
//  this.keyPair = $.jStorage.get("keypair")
  return this.keyPair
}

/**
 * Connects to the p2p network
 * @returns 
 */
Pns.prototype.connect = function() {
  var peer = new Peer(this.keyPair.publicKey, {key: 'zps3x1xyh24holxr50Edit'});
  peer.on('connection', function(conn) {
    conn.on('data', function(data){
      console.log(data);
    });
  });
}

/**
 * Generates a new keypair
 * @returns keypair
 */
Pns.prototype.generateKeyPair = function(passPhrase){
	this.passPhrase = passPhrase
	this.keyPair = cryptico.generateRSAKey(this.passPhrase, this.keySize)
	return this.keyPair
}

/**
 * Saves the keypair
 */
Pns.prototype.saveKeyPair = function(){
  $.jStorage.set("keypair", this.keyPair)
}

Pns.prototype.sign = function(plaintext){
	return this.keyPair.signStringWithSHA256(plaintext)
}