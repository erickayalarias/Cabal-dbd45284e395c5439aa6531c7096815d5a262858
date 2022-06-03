import { useAddress } from '@thirdweb-dev/react';
import { Background } from '../../Components/ThreeJS/Background';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  //TODO States
  const address = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      navigate('/auth');
    }
  }, [address]);

  //TODO If no wallet is connected, show connect wallet options
  return (
    <>
      <Background />
    </>
  );
};
