const Shortener = artifacts.require("Shortener");


contract("Shortener", (accounts) => {
  it("should assert true", async function () {
    const ShortenerInstance = await Shortener.deployed();
    const link = 'http://localhost:3000';
    const data = await web3.eth.abi.encodeFunctionCall({
      name: 'short',
      type: 'function',
      inputs: [{
        type: 'string',
        name: 'link'
      }]
    }, [link]);

    await web3.eth.sendTransaction({
       gasPrice: web3.utils.toHex(web3.utils.toWei('3000', 'gwei')),
       gasLimit: '0x520800',
       from: accounts[4], to: ShortenerInstance.address, value: web3.utils.toHex(web3.utils.toWei('0.0001', "ether")), data: data});

    let result = await ShortenerInstance.getLink.call(web3.utils.numberToHex(1));

    return assert.equal(result, link);
  });
});
