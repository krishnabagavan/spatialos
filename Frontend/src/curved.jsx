import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";

const CurvedPlane = ({ curve, yHeight, distance }) => {
    const planeRef = useRef();


    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(8, 4.5, 32, 32);



        const pos = geo.attributes.position.array;

        for (let i = 0; i < pos.length; i += 3) {
            pos[i + 2] = Math.sin(pos[i] * curve) * 1.5;
        }

        geo.attributes.position.needsUpdate = true;


        return geo;
    }, [curve]);

    return (
        <mesh ref={planeRef} position={[0, yHeight, -distance]}>

            <bufferGeometry attach="geometry" {...geometry} />

            <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
        </mesh>
    );
};

const Scene = () => {
    const [curve, setCurve] = useState(0.2);
    const [distance, setDistance] = useState(3);
    const [yHeight, setYHeight] = useState(0);

    const [gridVisible, setGridVisible] = useState(true);
    const [ambientLight, setAmbientLight] = useState(true);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [0, 1, 5] }}>
                <OrbitControls />
                {ambientLight && <ambientLight intensity={1.2} />}
                <directionalLight position={[2, 2, 5]} intensity={1.5} />
                {gridVisible && <Grid args={[10, 10]} position={[0, -0.01, 0]} />}
                <CurvedPlane curve={curve} yHeight={yHeight} distance={distance} />
            </Canvas>


            <div style={{ position: "absolute", bottom: 20, right: 20, padding: 10, background: "rgba(0,0,0,0.7)", color: "white", borderRadius: 5 }}>
                <label>Curve: <input type="range" min="0" max="0.5" step="0.01" value={curve} onChange={(e) => setCurve(parseFloat(e.target.value))} /></label>
                <label>Distance: <input type="range" min="1" max="10" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value))} /></label>
                
                <label>Y Height: <input type="range" min="-2" max="2" step="0.1" value={yHeight} onChange={(e) => setYHeight(parseFloat(e.target.value))} /></label>
                <label><input type="checkbox" checked={gridVisible} onChange={() => setGridVisible(!gridVisible)} /> Grid Toggle</label>
                <label><input type="checkbox" checked={ambientLight} onChange={() => setAmbientLight(!ambientLight)} /> Ambient Light</label>
                <button onClick={() => alert("AR Mode Activated!")}>AR Mode</button>
            </div>
        </div>
    );
};

export default Scene;
