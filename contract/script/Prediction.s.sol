// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PlonkVerifier} from "../src/PlonkVerifier.sol";
import {VerifyOrigin} from "../src/VerifyOrigin.sol";
import {Prediction} from "../src/Prediction.sol";

contract PredictionScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy PlonkVerifier contract
        PlonkVerifier pv = new PlonkVerifier();
        console.log("PlonkVerifier deployed at:", address(pv));

        // Deploy VerifyOrigin contract
        VerifyOrigin vo = new VerifyOrigin(address(pv));
        console.log("VerifyOrigin deployed at:", address(vo));

        // Deploy Prediction contract
        Prediction pd = new Prediction(address(vo));
        console.log("Prediction deployed at:", address(pd));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
