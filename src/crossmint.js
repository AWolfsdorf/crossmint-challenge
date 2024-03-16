import { POLYANET_ROUTE, COMETH_ROUTE, SOLOONS_ROUTE } from "./constants.js"

const SoloonColors = {
  WHITE_SOLOON: "white",
  BLUE_SOLOON: "blue",
  PURPLE_SOLOON: "purple",
  RED_SOLOON: "red"
}

const ComethDirections = {
  UP_COMETH: "up",
  DOWN_COMETH: "down",
  LEFT_COMETH: "left",
  RIGHT_COMETH: "right"
}

export default class Crossmint {
  constructor(host, candidateId) {
    this.host = host;
    this.candidateId = candidateId;
  }

  async getGoal() {
    const res = await fetch(this.host + `/api/map/${this.candidateId}/goal`);
    return (await res.json()).goal;
  } 

  async addSpaceObject(row, col, object_route, extraParams = {}) {
    return fetch(this.host + object_route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidateId: this.candidateId,
        row: row,
        column: col,
        ...extraParams
      })
    })
  }

  async addPolyplanet(row, col) {
    return this.addSpaceObject(row, col, POLYANET_ROUTE);
  }

  async addCometh(row, col, cometh) {
    const direction = ComethDirections[cometh];
    return this.addSpaceObject(row, col, COMETH_ROUTE, { direction });
  }

  async addSoloon(row, col, soloon) {
    return this.addSpaceObject(row, col, SOLOONS_ROUTE, { color: SoloonColors[soloon] });
  }
}