import React, { Component } from 'react';
import * as THREE from 'three';
import MouseInput from '../inputs/MouseInput';
import DraggableMail from './draggableMail';

import PropTypes from 'prop-types';

class AllMail extends Component {
  constructor(props, context){
    super(props, context)

    const cubePositions = [];
    cubePositions.length = 7;//This will be set to number of emails.

    for (let i = 0; i < cubePositions.length; ++i) {
      cubePositions[i] = new THREE.Vector3(
        Math.random() * 1000 - 500,
        Math.random() * 600 - 300,
        Math.random() * 800 - 400
      );
    }

    const cubes = [];
    cubes.length = cubePositions.length;
    this.cubes = cubes;

    this.cubePositions = cubePositions;

    this._hoveredCubes = 0;
    this._draggingCubes = 0;
  }

      componentDidMount() {
        const {
          onCubesMounted,
        } = this.props;

        onCubesMounted(this.cubes);
      }

      _onCubeCreate = (index, cube) => {
        this.cubes[index] = cube;
      };


      _onCubeMouseEnter = () => {
        if (this._hoveredCubes === 0) {
          const {
            onHoverStart,
          } = this.props;

          onHoverStart();
        }

      this._hoveredCubes++;
    };

    _onCubeMouseLeave = () => {
      this._hoveredCubes--;

      if (this._hoveredCubes === 0) {
        const {
          onHoverEnd,
        } = this.props;

        onHoverEnd();
      }
    };

    _onCubeDragStart = () => {
      if (this._draggingCubes === 0) {
        const {
          onDragStart,
        } = this.props;

        onDragStart();
      }

      this._draggingCubes++;
    };

    _onCubeDragEnd = () => {
      this._draggingCubes--;

      if (this._draggingCubes === 0) {
        const {
          onDragEnd,
        } = this.props;

        onDragEnd();
      }
    };


  render(){
    console.log("in all mail", this.props)
    const {
      mouseInput,
      camera,

      cursor,
    } = this.props;

    return(
      <group>
      {this.cubePositions.map((cubePosition, index) => {
        const onCreate = this._onCubeCreate.bind(this, index);
        return (<DraggableMail
          key={index}

          mouseInput={mouseInput}
          camera={camera}

          initialPosition={cubePosition}
          onCreate={onCreate}
          onMouseEnter={this._onCubeMouseEnter}
          onMouseLeave={this._onCubeMouseLeave}
          onDragStart={this._onCubeDragStart}
          onDragEnd={this._onCubeDragEnd}

          cursor={cursor}
        />);
      })}
    </group>

    )
  }
}

export default AllMail
