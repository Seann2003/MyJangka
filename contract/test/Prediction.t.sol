// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PlonkVerifier} from "../src/PlonkVerifier.sol";
import {VerifyOrigin} from "../src/VerifyOrigin.sol";
import {Prediction} from "../src/Prediction.sol";

contract PredictionTest is Test {
    PlonkVerifier public pv;
    VerifyOrigin public vo;
    Prediction public pd;
        // // Deploy PlonkVerifier contract
        // PlonkVerifier pv = new PlonkVerifier();
        // console.log("PlonkVerifier deployed at:", address(pv));

        // // Deploy VerifyOrigin contract
        // VerifyOrigin vo = new VerifyOrigin(address(pv));
        // console.log("VerifyOrigin deployed at:", address(vo));

        // // Deploy Prediction contract
        // Prediction pd = new Prediction(address(vo));
        // console.log("Prediction deployed at:", address(pd));

    function setUp() public {
        pv = new PlonkVerifier();
        vo = new VerifyOrigin(address(pv));
        pd = new Prediction(address(vo));
    }

    function testCreateEvent() public {
        pd.createEvent("Testing 123");
    }
}
