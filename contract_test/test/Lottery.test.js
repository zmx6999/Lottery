const Web3=require('web3')
const ganache=require('ganache-cli')
const web3=new Web3(ganache.provider())
const {interface,bytecode}=require('../compile')
const assert=require('assert')
let instance
let accounts
beforeEach(async () => {
    accounts=await web3.eth.getAccounts()
    instance=await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:[web3.utils.toWei('1','ether')]}).send({from:accounts[0],gas:3000000})
})
describe('Lottery',() => {
    it('play player',async () => {
        await instance.methods.play().send({from:accounts[0],gas:3000000,value:web3.utils.toWei('1','ether')})
    })

    it('play value',async () => {
        await instance.methods.play().send({from:accounts[0],gas:3000000,value:web3.utils.toWei('0.1','ether')})
    })

    it('play value2',async () => {
        await instance.methods.play().send({from:accounts[0],gas:3000000})
    })

    it('draw onlyManager',async () => {
        for (let i=1;i<=3;i++) await instance.methods.play().send({from:accounts[i],gas:3000000,value:web3.utils.toWei('1','ether')})
        await instance.methods.draw().send({from:accounts[1],gas:3000000})
    })

    it('draw playerCount',async () => {
        await instance.methods.draw().send({from:accounts[0],gas:3000000})
    })

    it('drawback onlyManager',async () => {
        for (let i=1;i<=3;i++) await instance.methods.play().send({from:accounts[i],gas:3000000,value:web3.utils.toWei('1','ether')})
        await instance.methods.drawback().send({from:accounts[1],gas:3000000})
    })

    it('drawback playerCount',async () => {
        await instance.methods.drawback().send({from:accounts[0],gas:3000000})
    })

    it('draw',async () => {
        let b={}
        for (let i=1;i<=3;i++) {
            b[i]=await web3.eth.getBalance(accounts[i])
            b[i]=web3.utils.fromWei(b[i],'ether')
            b[i]=parseFloat(b[i])
        }
        for (let i=1;i<=3;i++) await instance.methods.play().send({from:accounts[i],gas:3000000,value:web3.utils.toWei('1','ether')})
        await instance.methods.draw().send({from:accounts[0],gas:3000000})
        let winner=await instance.methods.winner().call()
        for (let i=1;i<=3;i++) {
            let r=await web3.eth.getBalance(accounts[i])
            r=web3.utils.fromWei(r,'ether')
            r=parseFloat(r)
            if (accounts[i]==winner)  assert(b[i]+1.9<r && r<b[i]+2,true,'')
            else assert(b[i]-1.1<r && r<b[i]-1,true,'')
        }

        for (let i=2;i<=4;i++) {
            b[i]=await web3.eth.getBalance(accounts[i])
            b[i]=web3.utils.fromWei(b[i],'ether')
            b[i]=parseFloat(b[i])
        }
        let round=await instance.methods.round().call()
        assert(round,1,'')
        for (let i=2;i<=4;i++) await instance.methods.play().send({from:accounts[i],gas:3000000,value:web3.utils.toWei('1','ether')})
        let playerCount=await instance.methods.getPlayersCount().call()
        assert(playerCount,3,'')
        let balance=await instance.methods.getBalance().call()
        assert(balance,web3.utils.toWei('3','ether'),'')
        await instance.methods.drawback().send({from:accounts[0],gas:3000000})
        for (let i=2;i<=4;i++) {
            let r=await web3.eth.getBalance(accounts[i])
            r=web3.utils.fromWei(r,'ether')
            r=parseFloat(r)
            assert(b[i]-0.1<r && r<b[i],true,'')
        }

        for (let i=3;i<=5;i++) {
            b[i]=await web3.eth.getBalance(accounts[i])
            b[i]=web3.utils.fromWei(b[i],'ether')
            b[i]=parseFloat(b[i])
        }
        round=await instance.methods.round().call()
        assert(round,2,'')
        for (let i=3;i<=5;i++) await instance.methods.play().send({from:accounts[i],gas:3000000,value:web3.utils.toWei('1','ether')})
        playerCount=await instance.methods.getPlayersCount().call()
        assert(playerCount,3,'')
        balance=await instance.methods.getBalance().call()
        assert(balance,web3.utils.toWei('3','ether'),'')
        await instance.methods.draw().send({from:accounts[0],gas:3000000})
        winner=await instance.methods.winner().call()
        for (let i=3;i<=5;i++) {
            let r=await web3.eth.getBalance(accounts[i])
            r=web3.utils.fromWei(r,'ether')
            r=parseFloat(r)
            if(winner==accounts[i]) assert(b[i]+1.9<r && r<b[i]+2,true,'')
            else assert(b[i]-1.1<r && r<b[i]-1,true,'')
        }
    })
})
