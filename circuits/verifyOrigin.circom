pragma circom 2.1.3;
template VerifyOrigin() {
    // Private input signals
    signal input originIdentifier;
    // Public input signals
    signal input expectedIdentifier;
    // Output signal (public)
    signal output out;
    // Create a constraint here saying that our input signals must equal each other.
    out <== originIdentifier - expectedIdentifier;
}
component main = VerifyOrigin();
