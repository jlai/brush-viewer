import { BitDepth, encode as encodePNG } from 'fast-png';

export function decodePackedBitmap(data: Uint8Array, depthBits: number, width: number, height: number) {
  const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const unpackedBytes = new Uint8Array(width * height * depthBits / 8);

  let offset = 0;
  const lineSizes = [];

  for (let lineNo = 0; lineNo < height; lineNo++) {
    lineSizes[lineNo] = dataView.getUint16(offset);
    offset += 2;
  }

  let outOffset = 0;

  for (let lineNo = 0; lineNo < height; lineNo++) {
    const endOfLine = offset + lineSizes[lineNo];
    while (offset < endOfLine) {
      let headerByte = dataView.getInt8(offset);
      offset += 1;

      if (headerByte >= 0) {
        const copyCount = headerByte + 1;

        for (let i = 0; i < copyCount; i++) {
          unpackedBytes[outOffset + i] = dataView.getUint8(offset + i);
        }

        offset += copyCount;
        outOffset += copyCount;

      } else if (headerByte > -128) {
        const copyCount = 1 - headerByte;
        const repeatedByte = dataView.getUint8(offset);

        for (let i = 0; i < copyCount; i++) {
          unpackedBytes[outOffset + i] = repeatedByte;
        }

        offset += 1;
        outOffset += copyCount;
      }
    }
  }

  return unpackedBytes;
}

export function decodeToPNG({ data, isCompressed, depthBits, width, height }: {
  data: Uint8Array,
  isCompressed: boolean,
  depthBits: number,
  width: number,
  height: number
}) {
  let decoded: Uint8Array | Uint16Array = isCompressed ? decodePackedBitmap(data, depthBits, width, height) : data;

  const expectedSize = width * height * depthBits / 8;

  if (decoded.byteLength > expectedSize) {
    decoded = new Uint8Array(decoded.buffer, decoded.byteOffset, expectedSize);
  }

  if (depthBits === 16) {
    decoded = new Uint16Array(decoded.buffer, decoded.byteOffset, width * height);
  }

  try {
    return encodePNG({
      width,
      height,
      data: decoded,
      depth: depthBits as BitDepth,
      channels: 1
    });
  } catch (e: any) {
    console.log(`error encoding PNG: w=${width} h=${height} compressed=${isCompressed} depth=${depthBits}`, e.stack);
    throw e;
  }
}
