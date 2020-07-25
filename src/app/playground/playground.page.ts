import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from  'three/examples/jsm/controls/OrbitControls';
@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  styleUrls: ['./playground.page.scss'],
})
export class PlaygroundPage implements OnInit {
  constructor() { }


  ngOnInit() { 
    // set up scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // controls

    // load headphone model
    var loader = new GLTFLoader();

    loader.load('../../assets/main/headphone.gltf', function (model) {

      model.scene.traverse(c => {
        c.castShadow = true;
      });

      // add model
      scene.add(model.scene);

      // add light
      var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
      scene.add(ambientLight);

      var pointLight1 = new THREE.PointLight(0xFF0040, 4 ,50);
      scene.add(pointLight1);

      var pointLight2 = new THREE.PointLight(0x0040FF, 3 ,50);
      scene.add(pointLight2);
      
      var pointLight3 = new THREE.PointLight(0x80FF80, 4 ,50);
      scene.add(pointLight3);

      renderer.render(scene, camera);
    },
      undefined, function (error) {
        console.error(error);
      }
    );

    renderer.render(scene, camera);
  }

}
