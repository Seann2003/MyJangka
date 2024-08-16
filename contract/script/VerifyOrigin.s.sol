// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PlonkVerifier} from "../src/PlonkVerifier.sol";
import {VerifyOrigin} from "../src/VerifyOrigin.sol";

contract VerifyOriginScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        PlonkVerifier pv = new PlonkVerifier();
        VerifyOrigin vo = new VerifyOrigin(address(pv));

        vm.stopBroadcast();
    }
}
