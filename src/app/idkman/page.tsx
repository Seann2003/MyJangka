'use client';

import { useState } from 'react';
import mintCertificate from "../../lib/mintCertificate";

export default function Home() {
    const [masAddress, setMasAddress] = useState(''); // Declare masAddress as a state variable
    const [isSuccess, setIsSuccess] = useState(false); // State for determining success or failure
    const [showOverlay, setShowOverlay] = useState(false); // State for controlling overlay visibility

    async function handleMintCertificate() { 
      const response = await fetch('/sadge.png');
      const imageBlob = await response.blob();
      const imageFile = new File([imageBlob], 'sadge.png', { type: 'image/png' });

      const formData = new FormData();
      
      formData.append("wallet_address", "0x9f84127B475249280Fe4acf02E109c41B95808FC");
      formData.append("to", masAddress);
      formData.append("contract_address", "0xa0Ae17658304Ee4839455D8539930476e130f278");
      formData.append('file', imageFile);
      formData.append("attributes", JSON.stringify({})); // Convert attributes to JSON string
      formData.append("name", "Expert Researcher");
      formData.append("description", "We love sadge");
      formData.append("callback_url", "https://google.com");
  
      try {
          const response = await mintCertificate(formData);  // Call the mintCertificate function with formData
          console.log('Certificate minted successfully:', response);
          setIsSuccess(true); // Set success state to true
      } catch (error) {
          console.error('Minting failed:', error);
          setIsSuccess(false); // Set success state to false
      }

      setShowOverlay(true); // Show the overlay after attempting minting
    }
  
    function handleCloseOverlay() {
      setShowOverlay(false); // Hide the overlay when the user clicks the button
    }

    return (
      <section className='pt-[100px] pb-[170px] text-center bg-black relative lg:pt-[180px]'>
        <div className="mb-4">
          <input
            type="text"
            value={masAddress} // Bind the input value to the state variable
            onChange={(e) => setMasAddress(e.target.value)} // Update state on input change
            placeholder="Enter your MAS Address"
            className="bg-gray-800 text-white py-2 px-4 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleMintCertificate} // No need to pass masAddress as it’s now in the state
          className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-lg border border-gray-500 hover:bg-gray-300 transition duration-300 ease-in-out"
        >
          Mint Certificate
        </button>

        {showOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md text-center">
              {isSuccess ? (
                <>
                  <p className="text-2xl font-semibold mb-4 text-black">Congratulations, you have obtained an NFT!</p>
                  <img src="/sadge.png" alt="Sadge" className="mb-4" />
                  <button
                    onClick={handleCloseOverlay}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
                  >
                    Poggers
                  </button>
                </>
              ) : (
                <>
                  <p className="text-2xl font-semibold mb-4 text-black">Minting has failed, please try again.</p>
                  <button
                    onClick={handleCloseOverlay}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    );
}
