import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor() { }


  animationItem: AnimationItem;

  lastFrame = 80;
  firstFrame = 0;
  currentFrame = 0;

  options: AnimationOptions = {
    path: '../../assets/main/data.json',
    autoplay: false,
  };

  ngOnInit() {

  }
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  prevFrame() {
    this.animationItem.playSpeed = .2
    this.animationItem.goToAndStop(this.animationItem.currentFrame - 20, true)
    this.currentFrame = this.animationItem.currentFrame;



    console.log(this.animationItem)
  }

  nextFrame() {
    this.animationItem.playSpeed = .2

    this.animationItem.goToAndStop(this.animationItem.currentFrame + 20, true)
    this.currentFrame = this.animationItem.currentFrame;


    console.log(this.animationItem)
  }

  onShow3DCanvas(){

  }

  ngOnDestroy(){
    this.animationItem.destroy();
  }
}
