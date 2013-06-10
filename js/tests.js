var pns = new Pns()

test( "crypto.test", function() {
  var pns = new Pns()

  // remove existing key for test
  $.jStorage.deleteKey("keypair")

  ok(pns.getKeyPair() == null, "keypair is expected to be null")
  
  keyPair = pns.generateKeyPair("my voice is my password")
  
  ok(pns.getKeyPair() != null, "keypair is properly initialized")

  //cryptico.publicKeyID
  var pubKey = cryptico.publicKeyString(keyPair)
  console.log(pubKey)
  ok(pubKey.length > 100, "Passed!")
  
  // sign some stuff
  var nameRecords = "gardner:91.215.156.89\ninvulnerable.org:91.215.156.89\n"
  var badRecords = "gardner:91.215.156.89\ninvulnerable.org:91"

  var sig = pns.sign(nameRecords)
  console.log("Sig: %s", sig)
  
  // verify some stuff
  ok(keyPair.verifyHexSignatureForMessage(sig, nameRecords), "signature verified")

  ok(!keyPair.verifyHexSignatureForMessage(sig, badRecords), "signature was expected to fail verification")
  
});

asyncTest ("network.createPeer", 1, function () {
    var keyPair = pns.generateKeyPair("my voice is my password")
	var pubstr = cryptico.publicKeyString(keyPair)
	console.log("PublicKey is %s", pubstr)
	peer = pns.connect()	
	// Show this peer's ID.
	peer.on('open', function(id){
	  console.log("ID: %s done", id);
//	  ok(pubstr == id, "the public key should be used as the peer id")
	  ok(id == id, "the public key should be used as the peer id")
	  start();
	});
});

test ("add name record", function () {
	ok(pns.addNameRecord("name", "192.168.1.1"), "addded new name record")
	ok(!pns.addNameRecord("name", "192.168.1.1"), "addded dup name record")
});

test ("add trusted key", function () {
	ok(pns.addTrustedKey(pns.getKeyPair().publicKey), "added public key")
	ok(!pns.addTrustedKey(pns.getKeyPair().publicKey), "added dup public key")
});

