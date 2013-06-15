parity
======

how can you trust your friends, friends

can store just under 900 records with todays browser standards

hope top develop  model

* enhance centralized dns with a web of trust.
* trust your friends and bypass registrars.
* have your own TLD for free.
* decentralized trust based on strong cryptography.

* generate a key pair
* send your friends your public key via facebook link
* sign
* send friends a link with your public key via facebook / email
* a friend sends you their public key link
* the l

random
------

if the key does not exist
	create a new key

	join the network
	find friend based on public key
	request a packet using public key

	send data

	user has no key pair
		generate key pair
	
	user joins a named group
	user requests data bundles for trusted keys	
	
	data bundle has
		array of "name=ip"
		array of keys trusted by user
	
	user keys for friends of friends 3 levels deep
	
	collision resolution using friend depth
	
	web of trust
	
	52 bits
	




	keypair.generate
	keypair.save
	keypair.load
	keypair.sign
	keypair.verify

	network.createPeer
	network.connect
	network.addFriend
	network.

	maintain a list of trusted peers (this is the list of public keys) and the last time that they were updated

	npm install peer


	mvp
		sign
		verify
		add trusted
		send names
		request names

	generate
	save
	load

	new Pns
	load
	sign
	verify

	startup
		(load|create) identity
		(add|load) trusted friends
	

		user starts up
			if no key is present
				ask user to import one or generate one
	
			once a keypair is in place
				verify the signed record
		
			import new records from the UI


				connect to the network using public key as id
	
			on connect
				cycle through trusted users sending and receiving updated name records
	
			wait for connections from other users
	
	
		send my records if they have changed since they were last sent to the user
		send my records if they are requested
		request records from any trusted peer with no existing record

