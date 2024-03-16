import Crossmint from '../src/crossmint';

const host = "FakeUrl";
const candidateId = "FakeCandidateId";

describe("Polyplanets", function () {
  let crossmint;
  beforeEach(function () {
    crossmint = new Crossmint(host, candidateId);
  });

  describe("creation", function () {
    it("SHOULD instanciate internal variables", function () {
      expect(crossmint.host).toBe(host);
      expect(crossmint.candidateId).toBe(candidateId);
    })
  });

  describe("addSpaceObject endpoint", function () {
    it("SHOULD call the correct endpoint", async function () {
      const row = 1;
      const col = 2;
      const objectRoute = "/api/fakeRoute";
      const extraParams = { fakeParam: "fakeValue" };
      const expectedUrl = host + objectRoute;
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
        ...extraParams,
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});
      await crossmint.addSpaceObject(row, col, objectRoute, extraParams);

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });

    it("SHOULD call the correct endpoint without extraParams", async function () {
      const row = 1;
      const col = 2;
      const objectRoute = "/api/fakeRoute";
      const expectedUrl = host + objectRoute;
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});
      await crossmint.addSpaceObject(row, col, objectRoute);

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });
  });

  describe("addPolyplanet endpoint", function () {
    it("SHOULD call the correct endpoint", async function () {
      const row = 1;
      const col = 2;
      const expectedUrl = host + "/api/polyanets";
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});

      await crossmint.addPolyplanet(row, col);

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });
  });
    
  describe("addSoloons endpoint", function () {
    it("SHOULD call the correct endpoint", async function () {
      const row = 1;
      const col = 2;
      const expectedUrl = host + "/api/soloons";
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});

      await crossmint.addSoloon(row, col);

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });
  });

  describe("addCometh endpoint", function () {
    it("SHOULD call the correct endpoint", async function () {
      const row = 1;
      const col = 2;
      const expectedUrl = host + "/api/comeths";
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
        direction: "up",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});

      await crossmint.addCometh(row, col, "UP_COMETH");

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });

    it("SHOULD call the correct endpoint with direction", async function () {
      const row = 1;
      const col = 2;
      const expectedUrl = host + "/api/comeths";
      const expectedBody = {
        candidateId: candidateId,
        row: row,
        column: col,
        direction: "down",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({});

      await crossmint.addCometh(row, col, "DOWN_COMETH");

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedBody),
      });
    });
  });

  describe("getGoal endpoint", function () {
    it("SHOULD call the correct endpoint", async function () {
      const expectedUrl = host + "/api/map/FakeCandidateId/goal";
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({ json: () => { return { goal: {} } } });

      await crossmint.getGoal();

      expect(fetchSpy).toHaveBeenCalledWith(expectedUrl);
    });

    it("SHOULD return the response as a json", async function () {
      const expectedResponse = { goal: "FakeGoal" };
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => expectedResponse,
      });

      const response = await crossmint.getGoal();

      expect(response).toEqual(expectedResponse.goal);
    });
  });
});
