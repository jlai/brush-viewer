import * as Comlink from 'comlink';
import JSZip from 'jszip';

import { AbrBrushFile } from '../shared/abr/AbrBrushFile';
import { getImageFileName } from '../shared/NameUtils';
import { LoadingState } from './LoadingState';

export type BrushFileInfo = {
  state: LoadingState;
  fileName: string;

  version?: string;

  decodedBrushes: number;
  totalBrushes?: number;
  errorText?: string;
};

export type BrushRef = {
  url: string;
  width: number;
  height: number;
  brushNum: number;
};

export type ExportOptions = {
  exportName: string;
  imageNamePattern: string;
};

const activeFiles = new Map<string, AbrBrushFile>();

export const workerApi = {
  async parseAbrFile(file: File, infoCb?: (fileInfo: BrushFileInfo) => (void)) {
    let info: BrushFileInfo = {
      fileName: file.name,
      state: LoadingState.Parsing,
      decodedBrushes: 0
    };

    infoCb?.(info);

    try {
      const brushFile = new AbrBrushFile(await file.arrayBuffer());
      activeFiles.set(file.name, brushFile);

      info = {
        ...info,
        state: LoadingState.Decoding,
        version: `${brushFile.version}.${brushFile.subversion}`,
        decodedBrushes: 0,
        totalBrushes: brushFile.samples.length
      };

      infoCb?.(info);

      const brushes: BrushRef[] = [];

      for (const sample of brushFile.samples) {
        brushes.push({
          url: sample.createBlobURL(),
          width: sample.width,
          height: sample.height,
          brushNum: sample.index + 1
        });

        info.decodedBrushes += 1;
        infoCb?.(info);
      }

      info.state = LoadingState.Done;
      infoCb?.(info);

      return brushes;
    } catch (e) {
      info.state = LoadingState.Error;
      info.errorText = e && (e as any).message;
      infoCb?.(info);

      this.cleanupFile(file);
      throw e;
    }
  },

  async exportToZipBuffer(file: File, {
    exportName,
    imageNamePattern
  }: ExportOptions) {
    const zip = new JSZip();
    const brushFile = activeFiles.get(file.name);

    if (!brushFile) {
      throw new Error('brush file not loaded');
    }

    const totalBrushes = brushFile.samples.length;

    let brushNum = 0;
    for (const sample of brushFile.samples) {
      brushNum += 1;

      const data = sample.getOrCreatePNG();
      const imageName = getImageFileName(imageNamePattern, exportName, brushNum, totalBrushes);

      zip.file(imageName, data, {
        date: file.lastModified ? new Date(file.lastModified) : undefined
      });
    }

    const buffer = await zip.generateAsync({ type: 'arraybuffer' });

    return Comlink.transfer(buffer, [buffer]);
  },

  cleanupFile(file: File) {
    const brushFile = activeFiles.get(file.name);

    brushFile?.cleanup();
    activeFiles.delete(file.name);
  },

  cleanupAll() {
    activeFiles.forEach(brushFile => brushFile.cleanup());
  }
};

export type WorkerApi = typeof workerApi;

Comlink.expose(workerApi);