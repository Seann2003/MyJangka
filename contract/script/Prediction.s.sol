// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Reputation} from "../src/Reputation.sol";
import {Prediction} from "../src/Prediction.sol";

contract PredictionScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Reputation contract
        Reputation rp = new Reputation();
        console.log("Reputation deployed at:", address(rp));

        // Deploy Prediction contract
        Prediction pd = new Prediction(address(rp));
        console.log("Prediction deployed at:", address(pd));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
