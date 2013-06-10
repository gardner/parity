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
	this.keyPair = null // $.jStorage.get("keypair", null)
	this.keySize = 1024
	this.peers = []
	this.peer = null
	this.trusted = []
}		

/**
 * Loads and return the keypair
 * @returns keypair
 */
Pns.prototype.getKeyPair = function(){
	if (this.keyPair == null) {
		this.keyPair = $.jStorage.get("keypair", null)
	}
	return this.keyPair
}

/**
 * Connects to the p2p network
 * @returns 
 */
Pns.prototype.connect = function() {
  console.log("Using peer id: %s", this.getKeyPair().publicKey)
  this.peer = new Peer(this.getKeyPair().publicKey, {key: 'zps3x1xyh24holxr'})
  this.peer.on('error', function(type){
    console.log("ERROR: %o ", type);
  });
  return this.peer
}

/**
 * Generates a new keypair
 * @returns keypair
 */
Pns.prototype.generateKeyPair = function(passPhrase){
	this.passPhrase = passPhrase
	this.keyPair = cryptico.generateRSAKey(this.passPhrase, this.keySize)
    $.jStorage.set("keypair", this.keyPair) //TODO this should be an array
	return this.keyPair
}

Pns.prototype.sign = function(plaintext){
	return this.keyPair.signStringWithSHA256(plaintext)
}

Pns.prototype.verify = function(plaintext){
	return this.keyPair.verifyHexSignatureForMessage(plaintext)
}

Pns.prototype.addTrusted = function(pubkey){
	if ($.inArray(pubkey, this.trusted) == -1) {
	    this.trusted.push(pubkey);
	}	
}