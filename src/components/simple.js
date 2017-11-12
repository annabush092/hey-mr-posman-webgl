import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ExampleBase from '../ExampleBase';
// import HTML3D from 'react-three-renderer-html3d/lib/HTML3D';
import TrackballControls from '../ref/trackball';
import MouseInput from '../inputs/MouseInput';

import AllMail from './allMail.js'
import PropTypes from 'prop-types';


export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    // this.cameraPosition = new THREE.Vector3(0, 0, 5);


    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 750),
      cameraRotation: new THREE.Euler(),
      cubeRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
    };

    this._cursor = {
      hovering: false,
      dragging: false,
    };

    this.lightPosition = new THREE.Vector3(0, 500, 2000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount() {
    const {
      container,
      camera,
    } = this.refs;

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
  }

  _onCubesMounted = (cubes) => {
    this.cubes = cubes;
  };

  _onHoverStart = () => {
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd = () => {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart = () => {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd = () => {
    this.setState({
      dragging: false,
    });
  };




  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);

    this.controls.dispose();
    delete this.controls;
  }

  _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.controls.update();
  }




  render() {
    console.log("in simple: ", this.state)

    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height


    const {
      cameraPosition,
      cameraRotation,

      mouseInput,
      camera,

      hovering,
      dragging,
    } = this.state;

    const style = {};

    if (dragging) {
      style.cursor = 'move';
    } else if (hovering) {
      style.cursor = 'pointer';
    }

    this._cursor.hovering = hovering;
    this._cursor.dragging = dragging;

    return (
      <div
      ref="container"
      style={style}
    >
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
        sortObjects={false}
        shadowMapEnabled
        shadowMapType={THREE.PCFShadowMap}
        clearColor={0xf0f0f0}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <resources>
          <boxGeometry
            resourceId="boxGeometry"

            width={40}
            height={40}
            depth={40}
          />
          <meshBasicMaterial
            resourceId="highlightMaterial"

            color={0xffff00}
            wireframe={false}
            transparent={true}
          />
        </resources>
        
        <scene ref="scene">
          <perspectiveCamera
            fov={70}
            aspect={width / height}
            near={1}
            far={10000}
            name="mainCamera"
            ref="camera"
            position={cameraPosition}
            rotation={cameraRotation}
          />
          <ambientLight
            color={0x505050}
          />
          <spotLight
            color={0xffffff}
            intensity={1.5}
            position={this.lightPosition}
            lookAt={this.lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <AllMail
            mouseInput={mouseInput}
            camera={camera}

            onCubesMounted={this._onCubesMounted}

            onHoverStart={this._onHoverStart}
            onHoverEnd={this._onHoverEnd}
            onDragStart={this._onDragStart}
            onDragEnd={this._onDragEnd}

            cursor={this._cursor}
          />
        </scene>
      </React3>
    </div>);
  }
}
