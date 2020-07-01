/**
 * Shapes for custom version of WebGL Globe Toolkit
 * https://github.com/nitrogl/webgl-globe
 *
 * Copyright 2020 Roberto Metere
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
class AbstractShape {
  constructor() {
    this.colour = undefined;
    if (new.target === AbstractShape) {
      throw new TypeError("Cannot construct AbstractShape instances directly");
    }
  }
  
  setColour(colour) {
    for (var i = 0; i < this.point.geometry.faces.length; i++) {
      this.point.geometry.faces[i].color = colour;
    }
    this.colour = colour;
  }
  
  setMagnitude(magnitude) {
    console.log("AbstractShape.setMagnitude - not yet implemented");
  }
  
  getPoint() {
    return this.point;
  }
  
  /**
   * Set position with latitude and longitude
   * 
   * @lat latitude in degrees
   * @lon longitude in degrees
   */
  setPosition(lat, lon, relpos, scale = 200) {
    this.position = { latitude: lat, longitude: lon, relpos: relpos, scale: scale };
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lon) * Math.PI / 180;
    
    this.point.position.x = scale * Math.sin(phi) * Math.cos(theta);
    this.point.position.y = scale * Math.cos(phi);
    this.point.position.z = scale * Math.sin(phi) * Math.sin(theta);
    
    this.point.lookAt(relpos);
  }
};

class BoxShape extends AbstractShape {
  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    this.point = new THREE.Mesh(this.geometry);
  }
  
  setMagnitude(magnitude) {
    this.point.scale.z = Math.max(magnitude, 0.1); // avoid non-invertible matrix
    this.point.updateMatrix();
  }
}

class CylinderShape extends BoxShape {
  constructor() {
    super();
    this.geometry = new THREE.CylinderGeometry(0.75, 0.75, 1, 8);
    this.geometry.rotateX(Math.PI/2);
    this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    this.point = new THREE.Mesh(this.geometry);
  }
}
