import { AssetService, LogService } from "./main";

const LOG_RECORD = {
  id: "1",
  assetId: "1",
  oldURL: "127.0.0.1",
  newURL: "127.0.0.2"
}

describe("AssetService: ", () => {
  const ASSET = {
    id: "1",
    name: "asset 1",
    url: "127.0.0.1"
  }
  const NEW_ASSET = {
    id: "1",
    name: "asset 1 updated",
    url: "127.0.0.2"
  }
  const WRONG_ID_ASSET = {
    id: "2",
    name: "asset 2 updated",
    url: "127.0.0.2"
  }

  const getExternalAssetsMock = jest.fn(() => [ASSET]);
  const service = new AssetService(getExternalAssetsMock);

  describe('#getAssets: ', () => {
    it('should return array of assets', () => {
      expect(service.getAssets()).toEqual([ASSET]);
    });
  });
  describe('#updateAsset: ', () => {
    it('should take asset and return updated asset', () => {
      expect(service.updateAsset(NEW_ASSET)).toEqual(NEW_ASSET);
    });
    it('should return null if asset id is not found in assets', () => {
      expect(service.updateAsset(WRONG_ID_ASSET)).toBeNull();
    });
    it('should write log record to log storage', () => {
      const service = new AssetService(getExternalAssetsMock);
      service.updateAsset(NEW_ASSET);
      expect(service.getLog()).toEqual([LOG_RECORD]);
    })
  });
  describe('#getLog: ', () => {
    it('should return log data', () => {
      const service = new AssetService(getExternalAssetsMock);
      expect(service.getLog()).toEqual([]);
    });
  });
});

describe('LogService: ', () => {
  const service = new LogService();
  expect(service.getLog()).toEqual([]);

  describe('#getLog: ', () => {
    it('should return array of logs', () => {
      service.addRecord(LOG_RECORD);
      expect(service.getLog()).toEqual([LOG_RECORD]);
    })
  })
  describe('#addRecord: ', () => {
    it('should add a record to logs storage', () => {
      const service = new LogService();
      expect(service.getLog()).toEqual([]);
      service.addRecord(LOG_RECORD);
      expect(service.getLog().length).toBe(1);
    })
  })
  describe('#get id: ', () => {
    it('should return id for next log record', () => {
      const service = new LogService();
      expect(service.id).toEqual("1");
    })
  })  
})
