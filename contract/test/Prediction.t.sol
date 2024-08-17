// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Reputation} from "../src/Reputation.sol";
import {Prediction} from "../src/Prediction.sol";

contract PredictionTest is Test {
    Reputation public rp;
    Prediction public pd;

    function setUp() public {
        rp = new Reputation();
        pd = new Prediction(address(rp));
    }

    function testCreateEvent() public {
        pd.createEvent("Testing 123");
    }
}
