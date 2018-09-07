const Lottery=artifacts.require("./Lottery.sol")
module.exports=function () {
    let instance
    Lottery.deployed().then(function (i) {
        instance=i
        //for (let i=1;i<=3;i++) instance.enter({from:web3.eth.accounts[i],value:web3.toWei(1,"ether"),gas:1000000})
        //instance.pickWinner({from:web3.eth.accounts[0],gas:1000000})
        //for (let i=1;i<=3;i++) console.log(web3.eth.getBalance(web3.eth.accounts[i]))
        /*instance.getBalance.call().then(function (r) {
            console.log(r)
        })*/
        //for (let i=4;i<=6;i++) instance.enter({from:web3.eth.accounts[i],value:web3.toWei(1,"ether"),gas:1000000})
        /*instance.getPlayers.call().then(function (r) {
            console.log(r)
            for (let i=4;i<=6;i++) console.log(web3.eth.accounts[i]+" "+web3.eth.getBalance(web3.eth.accounts[i]))
            instance.getBalance.call().then(function (r) {
                console.log(r)
            })
        })*/
        //instance.returnMoney({from:web3.eth.accounts[0],gas:1000000})
        /*for (let i=4;i<=6;i++) console.log(web3.eth.accounts[i]+" "+web3.eth.getBalance(web3.eth.accounts[i]))
        instance.getBalance.call().then(function (r) {
            console.log(r)
        })*/
    })
}