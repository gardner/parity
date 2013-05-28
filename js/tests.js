  
var pns = new Pns()

test( "crypto.test", function() {
  ok(pns.getKeyPair() == null, "keypair is expected tp be null")
  
  keyPair = pns.generateKeyPair("my voice is my password")
  pns.saveKeyPair()
  
  ok(pns.getKeyPair() != null, "keypair is properly initialized")

  //cryptico.publicKeyID
  var pubKey = cryptico.publicKeyString(keyPair)
  console.log(pubKey)
  ok(pubKey.length > 100, "Passed!")
  
  // sign some stuff
  var nameRecords = "gardner:91.215.156.89\ninvulnerable.org:91.215.156.89\n"

  var sig = pns.sign(nameRecords)
  console.log("Sig: %s", sig)

  // remove the key for future tests.
  $.jStorage.deleteKey("keypair")
});	

test ("p2p", function () {
    console.log("connect")
    pns.connect()
  
    pns.addPeer()
  
    var conn = peer.connect('some-id');
    conn.on('open', function() {
      conn.send('Hello world!');
    });	
})