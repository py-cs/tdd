// getAssets => Assets[]
// updateAsset(asset: Asset) + log => 
// getLog

export interface Asset {
  id: string;
  name: string;
  url: string;
}

export interface LogRecord {
  id: string;
  assetId: string;
  oldURL: string;
  newURL: string;
}

export class LogService {
  logs: LogRecord[] = []
  getLog() {
    return this.logs;
  }
  addRecord(record: LogRecord) {
    this.logs = [...this.logs, record]
  }
  get id() {
    return (this.logs.length + 1).toString();
  }
}

export class AssetService {
  constructor(private getExternalAssets: () => Asset[], private logService: LogService) {
  }

  getAssets(): Asset[] {
    return this.getExternalAssets()
  }

  updateAsset(asset: Asset): Asset | null {
    const assetToUpdate = this.getExternalAssets().find(item => item.id === asset.id);
    if (assetToUpdate) {
      const logRecord = {
        id: this.logService.id,
        assetId: assetToUpdate.id,
        oldURL: assetToUpdate.url,
        newURL: asset.url,
      }
      this.logService.addRecord(logRecord);
      return asset;
    };
    return null;
  }

  getLog() {
    return this.logService.getLog();
  }
}
