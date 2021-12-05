import KaitaiStream from 'kaitai-struct/KaitaiStream';
import Abr from './Abr';
import { decodeToPNG } from './BitmapDecoder';

export class AbrBrushFile {
  constructor(data) {
    try {
      this.abr = new Abr(new KaitaiStream(data));
    } catch (e) {
      // Check header
      const headerView = new DataView(data, 0, 4);
      const version = headerView.getUint16(0);
      const subversion = headerView.getUint16(0);

      if (version < 6 || version > 10) {
        throw new Error(`unsupported ABR version (or not a ABR file): version ${version}.${subversion}`);
      }

      throw new Error(`error parsing file structure [v${version}.${subversion}]: ${e.message}`);
    }

    this.samples = [];
    this.version = this.abr.header.version;
    this.subversion = this.abr.header.subversion;

    for (const section of this.abr.sections) {
      if (section.body instanceof Abr.SamplesSectionBody) {
        this.samples = section.body.samples
          .map((sample, i) => new AbrSampleBrush(sample.data, i));
      }
    }
  }

  cleanup() {
    for (const sample of this.samples) {
      sample.cleanup();
    }
  }
}

export class AbrSampleBrush {
  constructor(sampleData, index) {
    this.index = index;
    this.depthBits = sampleData.depth;
    this.width = sampleData.right - sampleData.left;
    this.height = sampleData.bottom - sampleData.top;
    this.isCompressed = sampleData.compression === 1;
    this.encodedBitmap = sampleData.bitmap;
  }

  getDecodeOptions() {
    return {
      data: this.encodedBitmap,
      isCompressed: this.isCompressed,
      depthBits: this.depthBits,
      width: this.width,
      height: this.height
    };
  }

  createPNG() {
    this.pngData = decodeToPNG(this.getDecodeOptions());
    return this.pngData;
  }

  getOrCreatePNG() {
    if (!this.pngData) {
      this.createPNG();
    }
    return this.pngData;
  }

  createBlobURL() {
    this.createPNG();
    this.url = URL.createObjectURL(new Blob([this.pngData], { type: 'image/png' }));
    return this.url;
  }

  cleanup() {
    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
  }
}
