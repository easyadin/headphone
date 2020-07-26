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

    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    controls.enabled = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = true;

    controls.rotateSpeed = 2

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;

    // controls.minDistance = 100;
    // controls.maxDistance = 500;

    // controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.4));

    var light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0x002288);
    light2.position.set(- 1, - 1, - 1);
    scene.add(light2);

    var light3 = new THREE.AmbientLight(0x222222);
    scene.add(light3);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 0, 8);
    scene.add(dirLight);

    var loader = new GLTFLoader();

    loader.load('../../assets/main/headphone-playground.gltf', function (gltf) {
      var model = gltf.scene;
      model.position.set(0, -20, 0);
      model.traverse(function (child) {
        child.traverse(c => {
          c.castShadow = true;
        });
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
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  }


  ngOnInit() { }

}
