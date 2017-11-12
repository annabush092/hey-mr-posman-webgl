import React, { Component } from 'react'
import CANNON from 'cannon';

class TryCannon extends Component {
  render(){

    var world = new CANNON.World();
    world.gravity.set(0,0,-9.82);
    world.broadphase = new CANNON.NaiveBroadphase();

    var mass = 5, radius = 1;
    var sphereShape = new CANNON.Sphere(radius)
    var sphereBody = new CANNON.Body({mass: mass, shape: sphereShape})

    sphereBody.position.set(0,0,4);

    world.add(sphereBody);

    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });

    world.add(groundBody);

    var timeStep = 1.0 / 60.0;

    for (var i = 0; i < 60; ++i){
      world.step(timeStep);
      console.log("In TryCannon: ", sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
    }

    return(
      <div>
      HEY MR POSTMAN
      </div>
    )
  }
}

export default TryCannon
