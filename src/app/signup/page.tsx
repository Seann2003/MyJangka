"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const router = useRouter(); // Initialize router

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the form from submitting and reloading the page

        try {
          // First API call to create the wallet
          const header = {
            'client_id': 'fe3722212e33c76fbb47bd61d7cac9ad08f232b071edb0ada2dcf2b2caf17b07',
            'client_secret': 'sk_b760b09d580c562e2b1249ec3ccbf173a30cd383f0e4bc3c1ee829571ead095b',
            'content-type': 'application/json'
          };
      
          const walletResponse = await axios.post(
            'https://service-testnet.maschain.com/api/wallet/wallet',
            { name: name },
            { headers: header }
          );
      
          // Corrected equality check for the status code
          if (walletResponse.status === 200) {
            const address = walletResponse.data.result.address;
            setWalletAddress(address);
            console.log(address);
            // Second API call to sign up the user
            const response = await axios.post('http://localhost:3001/auth/signup', {
              username: name,
              email: email,
              password: password,
              walletAddress: walletAddress
            });
            if(response.status === 200){
                router.push('/login'); // Change to your desired path
                console.log('Sign-up successful:', response.data);
            }else{
                console.error('failed to create:', response.data);
            }
          } else {
            console.error('Failed to create wallet:', walletResponse.data);
          }
        } catch (error) {
          console.error("Error: ", error)
        }
      };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-screen max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
