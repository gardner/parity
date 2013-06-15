/**
 * This file is part of Parity Name System.
 *
 * Parity Name System is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Parity Name System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Parity Name System.  If not, see <http://www.gnu.org/licenses/>.
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
	this.nameRecords = null
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

/**
 * @returns true when entry does not exist, false otherwise
 **/
Pns.prototype.addRecord = function(name, ipaddress){
	if ($.inArray(pubkey, this.trusted) == -1) {
	    this.trusted.push([name, ipaddress])
		return true
	} else {
		return false
	}
}

/**
 * @returns true when antry does not exist
 **/
Pns.prototype.addFriend = function(nickname, pubkey){
	if ($.inArray(pubkey, this.trusted) == -1) {
	    this.trusted.push([nickname, pubkey]);
		return true
	} else {
		return false
	}
}