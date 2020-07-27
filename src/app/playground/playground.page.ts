import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  styleUrls: ['./playground.page.scss'],
})
export class PlaygroundPage implements OnInit, AfterViewInit {
  constructor() {
  }

  ngAfterViewInit(): void {
    var dirLight, stats;
    var mixer, controls;

    // create scene
    var scene = new THREE.Scene();

    // create camera
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(20, -2, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera);

    // create renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    // add renderer to element
    const canvas = document.getElementById('main');
    canvas.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    // scene.add(new THREE.AxesHelper(500));
    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    controls.enabled = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 70.0;

    controls.rotateSpeed = 0.07;
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = true;

    // controls.minDistance = 100;
    // controls.maxDistance = 500;

    // controls.maxPolarAngle = Math.PI / 2;

    // lighting setup
    scene.add(new THREE.HemisphereLight(0xffeeb1, 0x080820, 4));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    // spotlight
    var spotlight = new THREE.SpotLight(0xffa95c, 4);
    spotlight.castShadow = true;
    spotlight.shadow.bias = -0.001;
    spotlight.shadow.mapSize.width = 1024 * 4;
    spotlight.shadow.mapSize.height = 1024 * 4;

    scene.add(spotlight)


    // load model
    var loader = new GLTFLoader();

    loader.load('../../assets/main/headphone-playground.gltf', (gltf) => {
      var model = gltf.scene.children[0];
      model.position.set(0, -10, 0);
      model.traverse(child => {
        child.traverse(n => {
          n.castShadow = true;
          n.receiveShadow = true;
        })
      });

      scene.add(model);

      animate();

    }, undefined, function (e) {
      console.error(e);
    });

    // readjust canvas on window resize
    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // animate
    function animate() {
      spotlight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
      );

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  }


  ngOnInit() { }

}
