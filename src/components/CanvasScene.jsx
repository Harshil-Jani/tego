import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "../css/canvas.css";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const light = new THREE.PointLight();
    light.position.set(0, -20, 10);
    scene.add(light);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);

    // Position the camera
    camera.position.set(10, -20, 0);
    camera.up = new THREE.Vector3(0, 0, 1.5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // Load the object
    const loader = new OBJLoader();
    loader.load(
      "bunny.obj",
      (obj) => {
        console.log(obj); // Debugging
        scene.add(obj);
        obj.scale.set(1.5, 1.5, 1.5);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = (xhr.loaded / xhr.total) * 100;
          console.log(`${percent}% loaded`); // Debugging
        }
      },
      (error) => {
        console.error(error); // Debugging
      }
    );
    let myReq;
    // set up rotation animation
    const animate = function () {
      requestAnimationFrame(animate);
      // camera.position.set(10,10,10);
      renderer.render(scene, camera);
      // myReq = window.requestAnimationFrame(animate);
    };
    animate();

    // Clean up the scene when the component unmounts
    return () => {
      // window.cancelAnimationFrame(myReq)
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
