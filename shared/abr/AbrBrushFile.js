import KaitaiStream from "kaitai-struct/KaitaiStream";
import Abr from "./Abr";
import { decodeToPNG } from "./BitmapDecoder";

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
        throw new Error(
          `unsupported ABR version (or not a ABR file): version ${version}.${subversion}`
        );
      }

      throw new Error(
        `error parsing file structure [v${version}.${subversion}]: ${e.message}`
      );
    }

    this.samples = [];
    this.samplesById = new Map();
    this.brushDataById = new Map();
    this.version = this.abr.header.version;
    this.subversion = this.abr.header.subversion;

    for (const section of this.abr.sections) {
      if (section.body instanceof Abr.SamplesSectionBody) {
        const samplesData = section.body.samples;
        for (let i = 0; i < samplesData.length; i++) {
          const sample = new AbrSampleBrush(samplesData[i].data, i);
          this.samplesById.set(sample.brushId, sample);
          this.samples.push(sample);
        }
      }

      if (section.body instanceof Abr.DescriptorsSectionBody) {
        const parsed = this.parseDescriptor(section.body);
        for (const brushData of parsed.Brsh || []) {
          const brushId = brushData.Brsh.sampledData;
          this.brushDataById.set(brushId, brushData);
        }
      }
    }

    for (const [brushId, sample] of this.samplesById.entries()) {
      const brushData = this.brushDataById.get(brushId);
      if (brushData) {
        sample.setBrushData(brushData);
      }
    }
  }

  parseDescriptor(descriptor) {
    const obj = {};
    for (const keyedItem of descriptor.keyedItems) {
      const key = keyedItem.key.text;
      obj[key] = this.parseValue(keyedItem.item);
    }

    return obj;
  }

  cleanString(text) {
    return text.replace(/(\u0000|\x00)+$/g, "")
  }

  parseValue(typedValue) {
    const value = typedValue.value;

    if (typeof value === "number") {
      return value;
    } else if (
      value instanceof Abr.UnicodeString ||
      value instanceof Abr.PascalStringU4 ||
      value instanceof Abr.CompactString
    ) {
      return this.cleanString(value.text);
    } else if (value instanceof Abr.DescriptorList) {
      return value.items.map((typedValue) => this.parseValue(typedValue));
    } else if (value instanceof Abr.Descriptor) {
      return this.parseDescriptor(value);
    } else if (value instanceof Abr.UnitFloatValue) {
      return value.value;
    } else if (value instanceof Abr.EnumeratedValue) {
      return this.cleanString(value.enum.text);
    }

    return value;
  }

  cleanup() {
    for (const sample of this.samples) {
      sample.cleanup();
    }
  }
}

const ASCII_DECODER = new TextDecoder("ASCII");

export class AbrSampleBrush {
  constructor(sampleData, index) {
    this.brushData = {};
    this.brushName = undefined;
    this.brushId = ASCII_DECODER.decode(sampleData.brushId);
    this.index = index;
    this.depthBits = sampleData.depth;
    this.width = sampleData.right - sampleData.left;
    this.height = sampleData.bottom - sampleData.top;
    this.isCompressed = sampleData.compression === 1;
    this.encodedBitmap = sampleData.bitmap;
  }

  setBrushData(data) {
    this.brushData = data;
    this.brushName = data["Nm  "];
  }

  getDecodeOptions() {
    return {
      data: this.encodedBitmap,
      isCompressed: this.isCompressed,
      depthBits: this.depthBits,
      width: this.width,
      height: this.height,
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
    this.url = URL.createObjectURL(
      new Blob([this.pngData], { type: "image/png" })
    );
    return this.url;
  }

  cleanup() {
    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
  }
}
