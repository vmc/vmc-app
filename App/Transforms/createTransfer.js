const protobuf = require("../protobuf");
const utf8 = require("utf8");
const base64 = require("base-64");
const crypto = require("crypto");
const { createHash } = require("crypto");
const secp256k1 = require("secp256k1");

export default createTransfer = (privateKeyHex, amount, publicKeyTo) => {

    // Transform hex private key to Buffer object
    privateKey = Buffer.from(privateKeyHex, "hex");

    // Get the public key in a compressed format
    var publicKey = secp256k1.publicKeyCreate(privateKey).toString("hex");

    // Sha512 hashing
    _hash = data => {
      return createHash("sha512")
        .update(data)
        .digest("hex");
    };

    // Globals for create_and_sign
    var dataHash = null;
    var result = null;
    var signature = null;

    function create_and_sign(header) {
      dataHash = createHash("sha256")
        .update(header)
        .digest();
      result = secp256k1.sign(dataHash, privateKey);
      signature = result.signature.toString("hex");
    }

    // Sawtooth transaction family name
    const FAMILY_NAME = "vmc-core-trans-tp";

    var rawPayload = "transfer," + amount.toString() + "," + publicKeyTo;

    // String to binary
    function str2ab(str) {
      var buf = new Buffer(str, "binary"); // 2 bytes for each char
      return buf;
    }

    // Encode payload to binary
    var payload = str2ab(rawPayload);

    // Create address to store in state
    var address =
      _hash(utf8.encode(FAMILY_NAME)).substring(0, 6) +
      _hash(utf8.encode(publicKey)).substring(0, 64);

    // List in and output addresses
    var inputAddressList = [address];
    var outputAddressList = [address];

    toAddress =
      _hash(utf8.encode(FAMILY_NAME)).substring(0, 6) +
      _hash(utf8.encode(publicKeyTo)).substring(0, 64);
    inputAddressList.push(toAddress);
    outputAddressList.push(toAddress);

    // Date object for the nonce
    var d = new Date();

    // Create transactionheader
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      signerPublicKey: publicKey.toString("hex"),
      familyName: FAMILY_NAME,
      familyVersion: "0.1",
      inputs: inputAddressList,
      outputs: outputAddressList,
      dependencies: [],
      payloadSha512: _hash(payload),
      batcherPublicKey: publicKey.toString("hex"),
      nonce: utf8.encode(d.getTime().toString(16))
    }).finish();

    // Create signature of transactionheader
    create_and_sign(transactionHeaderBytes);

    // Create transaction
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      payload: payload,
      headerSignature: signature
    });

    // List the transaction(s)
    const transactionlist = [transaction];

    // Create and encode BatchHeader
    const batchHeaderBytes = protobuf.BatchHeader.encode({
      signerPublicKey: publicKey.toString("hex"),
      transactionIds: transactionlist.map(txn => txn.headerSignature)
    }).finish();

    // Create signature of BatchHeader
    create_and_sign(batchHeaderBytes);

    // Create Batch
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      transactions: transactionlist,
      headerSignature: signature
    });

    // List the Batch(es)
    var batchL = [batch];

    var batchListBytes = protobuf.BatchList.encode({
      batches: [batch]
    }).finish();

    // React Native step: convert to Buffer (base64 when sending through backend)
    //batchListBytes = new Uint8Array(batchListBytes).buffer;

    batchListBytes = Buffer.from(batchListBytes).toString("base64");

    // Send Batch to validator and await response
    let transfer = {
      user: {
        user: publicKey
      },
      destination: publicKeyTo,
      batchlist: batchListBytes
    };

    return transfer
    
  };
