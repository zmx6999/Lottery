import Web3 from "web3"
let web3
if (typeof window.web3==="undefined") {
    web3=new Web3("http://localhost:7545")
} else {
    web3=new Web3(window.web3.currentProvider)
}
export default web3