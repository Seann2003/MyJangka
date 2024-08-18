import axios from 'axios';

const mintCertificate = async (certificateData) => {
  try {
    const response = await axios.post(
      'https://service-testnet.maschain.com/api/certificate/mint-certificate',
      certificateData,
      {
        headers: {
          'client_id': process.env.NEXT_PUBLIC_CERTIFICATE_CLIENT_KEY,
          'client_secret': process.env.NEXT_PUBLIC_CERTIFICATE_CLIENT_SECRET,
          'content-type': 'multipart/form-data',
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error minting certificate:', error);
    throw error;
  }
};

export default mintCertificate;
