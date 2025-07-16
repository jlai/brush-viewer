// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Abr = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var Abr = (function() {
  Abr.Tag = Object.freeze({
    TAG_8BIM: 943868237,

    943868237: "TAG_8BIM",
  });

  Abr.Subtag = Object.freeze({
    DESC: 1684370275,
    PATT: 1885434996,
    PHRY: 1885893241,
    SAMP: 1935764848,

    1684370275: "DESC",
    1885434996: "PATT",
    1885893241: "PHRY",
    1935764848: "SAMP",
  });

  Abr.DescriptorType = Object.freeze({
    DESCRIPTOR: 1331849827,
    STRING: 1413830740,
    UNIT_FLOAT: 1433302086,
    LIST: 1449938035,
    BOOLEAN: 1651470188,
    DOUBLE: 1685026146,
    ENUMERATED: 1701737837,
    INTEGER: 1819242087,
    ALIAS: 2540464499,

    1331849827: "DESCRIPTOR",
    1413830740: "STRING",
    1433302086: "UNIT_FLOAT",
    1449938035: "LIST",
    1651470188: "BOOLEAN",
    1685026146: "DOUBLE",
    1701737837: "ENUMERATED",
    1819242087: "INTEGER",
    2540464499: "ALIAS",
  });

  Abr.FloatUnit = Object.freeze({
    ANGLE: 591490663,
    NONE: 592342629,
    PERCENT: 592474723,
    PIXELS: 592476268,
    DISTANCE: 592604276,
    DENSITY: 592606060,

    591490663: "ANGLE",
    592342629: "NONE",
    592474723: "PERCENT",
    592476268: "PIXELS",
    592604276: "DISTANCE",
    592606060: "DENSITY",
  });

  function Abr(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Abr.prototype._read = function() {
    this.header = new Header(this._io, this, this._root);
    this.sections = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.sections.push(new Section(this._io, this, this._root));
      i++;
    }
  }

  var Channel = Abr.Channel = (function() {
    function Channel(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Channel.prototype._read = function() {
      this.isWritten = this._io.readU4be();
      if (this.isWritten > 0) {
        this.length = this._io.readU4be();
      }
      if ( ((this.isWritten > 0) && (this.length > 0)) ) {
        this.unusedDepth = this._io.readU4be();
      }
      if ( ((this.isWritten > 0) && (this.length > 0)) ) {
        this.imageData = new ImageData(this._io, this, this._root);
      }
    }

    return Channel;
  })();

  var DescriptorList = Abr.DescriptorList = (function() {
    function DescriptorList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DescriptorList.prototype._read = function() {
      this.itemCount = this._io.readU4be();
      this.items = [];
      for (var i = 0; i < this.itemCount; i++) {
        this.items.push(new TypedValue(this._io, this, this._root));
      }
    }

    return DescriptorList;
  })();

  var ImageData = Abr.ImageData = (function() {
    function ImageData(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ImageData.prototype._read = function() {
      this.top = this._io.readU4be();
      this.left = this._io.readU4be();
      this.bottom = this._io.readU4be();
      this.right = this._io.readU4be();
      this.depth = this._io.readU2be();
      this.compression = this._io.readU1();
      this.bitmap = this._io.readBytesFull();
    }

    return ImageData;
  })();

  var TypedValue = Abr.TypedValue = (function() {
    function TypedValue(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TypedValue.prototype._read = function() {
      this.type = this._io.readU4be();
      switch (this.type) {
      case Abr.DescriptorType.STRING:
        this.value = new UnicodeString(this._io, this, this._root);
        break;
      case Abr.DescriptorType.UNIT_FLOAT:
        this.value = new UnitFloatValue(this._io, this, this._root);
        break;
      case Abr.DescriptorType.ENUMERATED:
        this.value = new EnumeratedValue(this._io, this, this._root);
        break;
      case Abr.DescriptorType.INTEGER:
        this.value = this._io.readS4be();
        break;
      case Abr.DescriptorType.LIST:
        this.value = new DescriptorList(this._io, this, this._root);
        break;
      case Abr.DescriptorType.ALIAS:
        this.value = new AliasValue(this._io, this, this._root);
        break;
      case Abr.DescriptorType.BOOLEAN:
        this.value = this._io.readU1();
        break;
      case Abr.DescriptorType.DESCRIPTOR:
        this.value = new Descriptor(this._io, this, this._root);
        break;
      case Abr.DescriptorType.DOUBLE:
        this.value = this._io.readF8be();
        break;
      }
    }

    return TypedValue;
  })();

  var CompactString = Abr.CompactString = (function() {
    function CompactString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CompactString.prototype._read = function() {
      this.strLen = this._io.readU4be();
      this.text = KaitaiStream.bytesToStr(this._io.readBytes((this.strLen > 0 ? this.strLen : 4)), "ascii");
    }

    return CompactString;
  })();

  var Descriptor = Abr.Descriptor = (function() {
    function Descriptor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Descriptor.prototype._read = function() {
      this.className = new UnicodeString(this._io, this, this._root);
      this.classId = new CompactString(this._io, this, this._root);
      this.itemCount = this._io.readU4be();
      this.keyedItems = [];
      for (var i = 0; i < this.itemCount; i++) {
        this.keyedItems.push(new KeyedItem(this._io, this, this._root));
      }
    }

    return Descriptor;
  })();

  var Section = Abr.Section = (function() {
    function Section(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Section.prototype._read = function() {
      this.tag = this._io.readU4be();
      this.subtag = this._io.readU4be();
      this.bodyLen = this._io.readU4be();
      switch (this.subtag) {
      case Abr.Subtag.SAMP:
        this._raw_body = this._io.readBytes(this.bodyLen);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SamplesSectionBody(_io__raw_body, this, this._root);
        break;
      case Abr.Subtag.DESC:
        this._raw_body = this._io.readBytes(this.bodyLen);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new DescriptorsSectionBody(_io__raw_body, this, this._root);
        break;
      case Abr.Subtag.PHRY:
        this._raw_body = this._io.readBytes(this.bodyLen);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new HierarchiesSectionBody(_io__raw_body, this, this._root);
        break;
      default:
        this.body = this._io.readBytes(this.bodyLen);
        break;
      }
      if (!(this._io.isEof())) {
        this.padding = this._io.readBytes(KaitaiStream.mod(-(this.bodyLen), 4));
      }
    }

    return Section;
  })();

  var SamplesSectionBody = Abr.SamplesSectionBody = (function() {
    function SamplesSectionBody(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SamplesSectionBody.prototype._read = function() {
      this.samples = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.samples.push(new Sample(this._io, this, this._root));
        i++;
      }
    }

    return SamplesSectionBody;
  })();

  var KeyedItem = Abr.KeyedItem = (function() {
    function KeyedItem(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    KeyedItem.prototype._read = function() {
      this.key = new CompactString(this._io, this, this._root);
      this.item = new TypedValue(this._io, this, this._root);
    }

    return KeyedItem;
  })();

  var PascalStringU4 = Abr.PascalStringU4 = (function() {
    function PascalStringU4(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PascalStringU4.prototype._read = function() {
      this.strLen = this._io.readU4be();
      this.text = KaitaiStream.bytesToStr(this._io.readBytes(this.strLen), "ascii");
    }

    return PascalStringU4;
  })();

  var SampleData = Abr.SampleData = (function() {
    function SampleData(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SampleData.prototype._read = function() {
      this.idLen = this._io.readU1();
      this.brushId = this._io.readBytes(this.idLen);
      if (this._root.header.subversion == 2) {
        this.bodyV62 = new V62(this._io, this, this._root);
      }
      if (this._root.header.subversion == 1) {
        this.bodyV61 = new V61(this._io, this, this._root);
      }
    }

    return SampleData;
  })();

  var V62 = Abr.V62 = (function() {
    function V62(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    V62.prototype._read = function() {
      this.metaLen = this._io.readU2be();
      this.metaA = this._io.readU2be();
      this.version = this._io.readU4be();
      this.length = this._io.readU4be();
      this.bounds = this._io.readBytes(16);
      this.numChannels = this._io.readU4be();
      this.channels = [];
      for (var i = 0; i < this.numChannels; i++) {
        this.channels.push(new Channel(this._io, this, this._root));
      }
    }

    return V62;
  })();

  var HierarchiesSectionBody = Abr.HierarchiesSectionBody = (function() {
    function HierarchiesSectionBody(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HierarchiesSectionBody.prototype._read = function() {
      this.unknownData = this._io.readBytesFull();
    }

    return HierarchiesSectionBody;
  })();

  var EnumeratedValue = Abr.EnumeratedValue = (function() {
    function EnumeratedValue(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EnumeratedValue.prototype._read = function() {
      this.type = new CompactString(this._io, this, this._root);
      this.enum = new CompactString(this._io, this, this._root);
    }

    return EnumeratedValue;
  })();

  var Sample = Abr.Sample = (function() {
    function Sample(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Sample.prototype._read = function() {
      this.sampleLen = this._io.readU4be();
      this._raw_data = this._io.readBytes(this.sampleLen);
      var _io__raw_data = new KaitaiStream(this._raw_data);
      this.data = new SampleData(_io__raw_data, this, this._root);
      this.padding = this._io.readBytes(KaitaiStream.mod(-(this.sampleLen), 4));
    }

    return Sample;
  })();

  var Header = Abr.Header = (function() {
    function Header(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Header.prototype._read = function() {
      this.version = this._io.readU2be();
      this.subversion = this._io.readU2be();
    }

    return Header;
  })();

  var UnicodeString = Abr.UnicodeString = (function() {
    function UnicodeString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    UnicodeString.prototype._read = function() {
      this.utf16CharCount = this._io.readU4be();
      this.text = KaitaiStream.bytesToStr(this._io.readBytes((this.utf16CharCount * 2)), "UTF-16BE");
    }

    return UnicodeString;
  })();

  var DescriptorsSectionBody = Abr.DescriptorsSectionBody = (function() {
    function DescriptorsSectionBody(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DescriptorsSectionBody.prototype._read = function() {
      this.unknown = this._io.readBytes(18);
      this.itemCount = this._io.readU4be();
      this.keyedItems = [];
      for (var i = 0; i < this.itemCount; i++) {
        this.keyedItems.push(new KeyedItem(this._io, this, this._root));
      }
    }

    return DescriptorsSectionBody;
  })();

  var AliasValue = Abr.AliasValue = (function() {
    function AliasValue(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AliasValue.prototype._read = function() {
      this.length = this._io.readU4be();
      this.data = this._io.readBytes(this.length);
    }

    return AliasValue;
  })();

  var V61 = Abr.V61 = (function() {
    function V61(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    V61.prototype._read = function() {
      this.unknown = this._io.readBytes(10);
      this.imageData = new ImageData(this._io, this, this._root);
    }

    return V61;
  })();

  var UnitFloatValue = Abr.UnitFloatValue = (function() {
    function UnitFloatValue(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    UnitFloatValue.prototype._read = function() {
      this.unit = this._io.readU4be();
      this.value = this._io.readF8be();
    }

    return UnitFloatValue;
  })();

  return Abr;
})();
return Abr;
}));
