// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Abr = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
  var Abr = (function () {
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

    function Abr(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Abr.prototype._read = function () {
      this.header = new Header(this._io, this, this._root);
      this.sections = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.sections.push(new Section(this._io, this, this._root));
        i++;
      }
    }

    var Section = Abr.Section = (function () {
      function Section(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      Section.prototype._read = function () {
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

    var SamplesSectionBody = Abr.SamplesSectionBody = (function () {
      function SamplesSectionBody(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      SamplesSectionBody.prototype._read = function () {
        this.samples = [];
        var i = 0;
        while (!this._io.isEof()) {
          this.samples.push(new Sample(this._io, this, this._root));
          i++;
        }
      }

      return SamplesSectionBody;
    })();

    var PascalStringU4 = Abr.PascalStringU4 = (function () {
      function PascalStringU4(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      PascalStringU4.prototype._read = function () {
        this.strLen = this._io.readU4be();
        this.value = KaitaiStream.bytesToStr(this._io.readBytes(this.strLen), "ascii");
      }

      return PascalStringU4;
    })();

    var SampleData = Abr.SampleData = (function () {
      function SampleData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      SampleData.prototype._read = function () {
        this.idLen = this._io.readU1();
        this.brushId = this._io.readBytes(this.idLen);
        this.unknown = this._io.readBytes(264);
        this.top = this._io.readU4be();
        this.left = this._io.readU4be();
        this.bottom = this._io.readU4be();
        this.right = this._io.readU4be();
        this.depth = this._io.readU2be();
        this.compression = this._io.readU1();
        this.bitmap = this._io.readBytesFull();
      }

      return SampleData;
    })();

    var HierarchiesSectionBody = Abr.HierarchiesSectionBody = (function () {
      function HierarchiesSectionBody(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      HierarchiesSectionBody.prototype._read = function () {
        this.unknownData = this._io.readBytesFull();
      }

      return HierarchiesSectionBody;
    })();

    var Sample = Abr.Sample = (function () {
      function Sample(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      Sample.prototype._read = function () {
        this.sampleLen = this._io.readU4be();
        this._raw_data = this._io.readBytes(this.sampleLen);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new SampleData(_io__raw_data, this, this._root);
        this.padding = this._io.readBytes(KaitaiStream.mod(-(this.sampleLen), 4));
      }

      return Sample;
    })();

    var Header = Abr.Header = (function () {
      function Header(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      Header.prototype._read = function () {
        this.version = this._io.readU2be();
        this.subversion = this._io.readU2be();
      }

      return Header;
    })();

    var DescriptorsSectionBody = Abr.DescriptorsSectionBody = (function () {
      function DescriptorsSectionBody(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;

        this._read();
      }
      DescriptorsSectionBody.prototype._read = function () {
        this.unknownData = this._io.readBytesFull();
      }

      return DescriptorsSectionBody;
    })();

    return Abr;
  })();
  return Abr;
}));
