import create, { SetState, GetState } from 'zustand';
import { persist } from "zustand/middleware"
import * as Comlink from 'comlink';
import FileSaver from 'file-saver';
import { pick } from 'lodash';

import { WorkerApi, BrushFileInfo, BrushRef } from '../workers/BrushFileWorker';
import { getImageFileName } from '../shared/NameUtils';
import { FileLoadError } from '../shared/FileLoadError';

function releaseComlinkProxy(proxyObj: any) {
  const release = proxyObj && proxyObj[Comlink.releaseProxy];
  release && release();
}

export type BrushExtractorStore = {
  activeFile?: File | null;
  worker?: Worker | null;
  workerLink?: Comlink.Remote<WorkerApi> | null;
  fileInfo?: BrushFileInfo;
  brushes?: BrushRef[];
  fileLoadError?: FileLoadError | null;

  exportName?: string;
  imageNamePattern: string;
  defaultImageNamePattern: string;
  showingExportSettings: boolean;

  setActiveFile(file: File | null): Promise<void>;
  setWorker(worker: Worker | null): Promise<void>;
  setFileLoadError(error?: FileLoadError): void;
  setExportName(name: string): void;
  getExportName(): string;
  getDefaultExportName(): string;
  setImageNamePattern(pattern: string): void;
  setShowingExportSettings(showing: boolean): void;
  getImageFileName(num: number, brushName?: string): string;
  exportToZip(): Promise<void>;
};

const DEFAULT_IMAGE_NAME_PATTERN = '%f/%f - %n';

const PERSISTED_KEYS: Array<keyof BrushExtractorStore> = [
  'imageNamePattern',
  'showingExportSettings'
];

export const useStore = create<BrushExtractorStore>(persist((
  set: SetState<BrushExtractorStore>,
  get: GetState<BrushExtractorStore>
) => ({
  defaultImageNamePattern: DEFAULT_IMAGE_NAME_PATTERN,
  imageNamePattern: DEFAULT_IMAGE_NAME_PATTERN,

  showingExportSettings: (() => false)(), // FIXME: uhhhh

  async setActiveFile(file: File | null) {
    const {
      workerLink,
      activeFile: oldActiveFile,
      getDefaultExportName,
      setFileLoadError
    } = get();

    if (oldActiveFile) {
      await workerLink?.cleanupFile(oldActiveFile);
    }

    set(state => ({
      activeFile: file,
      fileInfo: undefined,
      fileLoadError: undefined
    }));

    if (file && workerLink) {
      // Start parsing new file
      const updateFileInfo = Comlink.proxy((fileInfo: BrushFileInfo) => {
        if (get().activeFile === file) {
          set(state => ({
            fileInfo
          }));
        }
      });

      // Reset export name
      set(state => ({ exportName: getDefaultExportName() }));

      // Cleanup
      try {
        set(state => ({
          brushes: undefined,
          fileInfo: undefined
        }));
        const brushes = await workerLink.parseAbrFile(file, updateFileInfo);
        set(state => ({ brushes }));
      } catch (e: any) {
        setFileLoadError({
          message: e.message
        })
      } finally {
        releaseComlinkProxy(updateFileInfo);
      }
    }
  },

  async setWorker(worker: Worker | null) {
    const {
      worker: oldWorker,
      workerLink: oldWorkerLink
    } = get();

    await oldWorkerLink?.cleanupAll();
    releaseComlinkProxy(oldWorkerLink);
    oldWorker?.terminate();

    set(state => ({
      worker,
      workerLink: worker && Comlink.wrap<WorkerApi>(worker)
    }));
  },

  setFileLoadError(fileLoadError: FileLoadError | undefined) {
    set(state => ({ fileLoadError }));
  },

  setExportName(name: string) {
    set(state => ({ exportName: name }));
  },

  getExportName() {
    return get().exportName || get().getDefaultExportName();
  },

  getDefaultExportName() {
    const fileName = get().fileInfo?.fileName || get().activeFile?.name;
    return fileName?.replace(/.abr$/i, '') || '';
  },

  getImageFileName(num: number, brushName: string) {
    const { getExportName, imageNamePattern, fileInfo } = get();

    return getImageFileName(imageNamePattern, getExportName(), brushName, num, fileInfo?.totalBrushes || 0);
  },

  setImageNamePattern(pattern: string) {
    set(state => ({ imageNamePattern: pattern }));
  },

  setShowingExportSettings(showingExportSettings: boolean) {
    set(state => ({ showingExportSettings }));
  },

  async exportToZip() {
    const {
      workerLink,
      activeFile,
      imageNamePattern,
      getExportName
    } = get();

    if (!activeFile || !workerLink) {
      throw new Error('no active file');
    }

    const exportName = getExportName();

    const buffer = await workerLink.exportToZipBuffer(activeFile, {
      exportName,
      imageNamePattern
    });

    const blob = new Blob([buffer], { type: 'application/zip' });

    FileSaver.saveAs(blob, `${exportName}.zip`);
  }
}), {
  // Persist options
  name: 'brush-viewer-store',

  partialize(state) {
    return pick(state, PERSISTED_KEYS);
  }
}));
