import { AssetService, LogService } from "./main";

describe("AssetService: ", () => {
  const ASSET = {
    id: "1",
    name: "asset 1",
    url: "127.0.0.1"
  }
  const UPDATED_ASSET = {
    id: "1",
    name: "asset 1 updated",
    url: "127.0.0.2"
  }
  const WRONG_ASSET = {
    id: "wrongId",
    name: "wrongName",
    url: "wrongUrl"
  }

  const LOG_RECORD = {
    id: "1",
    assetId: "1",
    oldURL: "127.0.0.1",
    newURL: "127.0.0.2"
  }

  const getExternalAssetsMock = jest.fn(() => [ASSET]);
  const logService = new LogService();
  const service = new AssetService(getExternalAssetsMock, logService);

  it('should return array of assets', () => {
    expect(service.getAssets()).toEqual([ASSET]);
  });

  it('should update asset info with passed data', () => {
    expect(service.updateAsset(UPDATED_ASSET)).toEqual(UPDATED_ASSET);
  });

  it('should return null when trying to update asset that doesnt exist', () => {
    expect(service.updateAsset(WRONG_ASSET)).toBeNull();
  });

  it('should write log record to log storage on asset update', () => {
    const service = new AssetService(getExternalAssetsMock, new LogService());
    service.updateAsset(UPDATED_ASSET);
    expect(service.getLog()).toEqual([LOG_RECORD]);
  });

  it('should return log data', () => {
    const service = new AssetService(getExternalAssetsMock, new LogService());
    expect(service.getLog()).toEqual([]);
  });
});
