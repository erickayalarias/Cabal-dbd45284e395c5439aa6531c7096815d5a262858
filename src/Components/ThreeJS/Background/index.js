import * as THREE from 'three';
import { motion } from 'framer-motion';
import '@pixel/fonts';
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';
import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from 'react-three-fiber';
import circleImg from '../../../assets/img/circle.png';
import MetaImg from '../../../assets/img/metamask-630903.png';
import CoinImg from '../../../assets/img/coinbase_icon_146203.png';
import WalletImg from '../../../assets/img/WalletConnect-icon.png';
import {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
extend({ OrbitControls });

function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controlsRef = useRef();
  useFrame(() => controlsRef.current.update());

  return (
    <orbitControls ref={controlsRef} args={[camera, domElement]} />
  );
}

const SpinningMesh = ({
  position,
  color,
  speed,
  args,
  img,
  connection,
}) => {
  const imgTex2 = useLoader(THREE.TextureLoader, img);
  //TODO ref to target the mesh
  const mesh = useRef();

  //TODO useFrame allows us to re-render/update rotation on each frame
  useFrame(
    () => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  );
  //TODO Basic expand state
  const [expand, setExpand] = useState(false);

  return (
    <mesh position={position} ref={mesh} onClick={() => connection()}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial
        attach="material"
        color={color}
        map={imgTex2}
      />
    </mesh>
  );
};

export function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();

  let t = 0;
  let f = 0.002;
  let a = 3;
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 75;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  useFrame(() => {
    t += 15;

    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x00aaff}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  // const disconnectWallet = useDisconnect();
  // const address = useAddress();
  // const network = useNetwork();

  //TODO Functions

  // const checkLoginAccount = async () => {
  //   const bodyParameters = {
  //     publicKey: address,
  //   };
  //   const data = await axios.post(
  //     `${URL}/checkPublicKey`,
  //     bodyParameters
  //   );
  // };

  // useEffect(() => {
  //   if (address) {
  //     checkLoginAccount();
  //   }
  // }, [address]);

  return (
    <Canvas camera={{ position: [50, 20, 100], fov: 60 }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <Suspense fallback={null}>
        <SpinningMesh
          position={[0, 15, 0]}
          color="white"
          args={[10, 10, 10]}
          img={CoinImg}
          connection={() => connectWithCoinbaseWallet()}
        />
        <SpinningMesh
          position={[-12, 15, 22]}
          color="white"
          args={[10, 10, 10]}
          img={MetaImg}
          connection={() => connectWithMetamask()}
        />
        <SpinningMesh
          position={[12, 15, -22]}
          color="white"
          args={[10, 10, 10]}
          img={WalletImg}
          connection={() => connectWithWalletConnect()}
        />
        <Points />
      </Suspense>
      <CameraControls />
    </Canvas>
  );
}

export const Background = () => {
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: 'black',
          overflow: 'hidden',
          maxHeight: '100%',
        }}
        className="anim"
      >
        <motion.h1
          initial={{ x: -300, y: -50 }}
          animate={{
            x: 900,
            y: 50,
          }}
          transition={{
            duration: 2,
            ease: 'linear',
            delay: 0.5,
            type: 'spring',
          }}
          style={{
            marginTop: '-10px',
            color: 'purple',
            backgroundColor: 'black',
            fontSize: '5rem',
            fontFamily: 'PixelArial',
          }}
        >
          CABAL
        </motion.h1>
        <motion.h6
          initial={{ x: -100, y: -30 }}
          animate={{
            x: 1000,
            y: 30,
          }}
          transition={{
            duration: 2,
            ease: 'linear',
            delay: 0.5,
            type: 'spring',
          }}
          style={{
            color: 'purple',
            backgroundColor: 'black',
            fontSize: '2rem',
            fontFamily: 'PixelArial',
          }}
        >
          Join the Community,
        </motion.h6>
        <motion.h6
          initial={{ x: '-50%', y: '-50%' }}
          animate={{
            x: '50%',
            y: '50%',
          }}
          transition={{
            duration: 2,
            ease: 'linear',
            delay: 0.5,
            type: 'spring',
          }}
          style={{
            color: 'purple',
            backgroundColor: 'black',
            fontSize: '2rem',
            fontFamily: 'PixelArial',
          }}
        >
          Join the Future
        </motion.h6>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimationCanvas />
        </Suspense>
      </div>
    </>
  );
};
