import { host, candidateId } from './config.js'
import Crossmint from './src/crossmint.js'

const sleep = ms => new Promise(r => setTimeout(r, ms));

const crossmint = new Crossmint(host, candidateId);

async function phase1() {
  // We need to draw a cross of planets in a map of 11x11
  // the cross has a padding of 2 in each direction
  
  function isInDiagonal(row, col, squareSize) {
    return row === col || row + col === squareSize - 1;
  }

  function isInsidePadding(row, col, squareSize, padding) {
    return !(row < padding || row >= squareSize - padding || col < padding || col >= squareSize - padding);
  }

  const squareSize = 11;
  const padding = 2;

  const positions = [];
  for (let row = 0; row < squareSize; row++) {
    for (let col = 0; col < squareSize; col++) {
      if (isInsidePadding(row, col, squareSize, padding) && isInDiagonal(row, col, squareSize)) {
        positions.push({ row, col });
      }
    }
  }

  const responses = [];
  for await (const pos of positions) {
    const { row, col } = pos;
    let res;
    while (!res || res.status !== 200) {
      res = await crossmint.addPolyplanet(row, col);
      await sleep(1000)
    }
    
    responses.push(res);
  }

  console.log((await Promise.all(responses)).map(res => res.status));
} 

const SPACE_OBJECTS = {
  COMETH: "COMETH",
  POLYANET: "POLYANET",
  SOLOON: "SOLOONS"
}

const MAX_TRY_COUNT = 10;

function getSpaceTypeFromName(name) {
  if (name.includes("COMETH")) {
    return SPACE_OBJECTS.COMETH;
  } else if (name.includes("POLYANET")) {
    return SPACE_OBJECTS.POLYANET;
  } else if (name.includes("SOLOON")) {
    return SPACE_OBJECTS.SOLOON;
  }
}

async function phase2() {
  
  const goal = await crossmint.getGoal();

  const spaceObjects = []
  for (let [row, spaceLine] of goal.entries()) {
    for (let [col, spacePoint] of spaceLine.entries()) {
      if (!spacePoint.includes("SPACE")) {
        const spaceType = getSpaceTypeFromName(spacePoint);
        spaceObjects.push({ row, col, spaceObject: spacePoint, spaceType });
      }
    }
  }

  const responses = [];
  for (const spaceObject of spaceObjects) {
    const { row, col, spaceObject: object_route } = spaceObject;
    let res;
    let tryCount = 0;
    while (tryCount < MAX_TRY_COUNT && (!res || res.status !== 200)) {
      console.log(`Trying to add ${spaceObject.spaceObject} at ${row}, ${col}, try ${tryCount}`);
      switch (spaceObject.spaceType) {
        case SPACE_OBJECTS.COMETH:
          res = await crossmint.addCometh(row, col, object_route);
          break;
        case SPACE_OBJECTS.POLYANET:
          res = await crossmint.addPolyplanet(row, col);
          break;
        case SPACE_OBJECTS.SOLOON:
          res = await crossmint.addSoloon(row, col, object_route);
          break;
      }
      await sleep(tryCount * 1000);
      tryCount++;
    }
    responses.push(res);
  }
  console.log(responses.map(res => res.status));
  console.log("Done");
}



// phase1();
phase2();