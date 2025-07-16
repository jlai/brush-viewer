meta:
  id: abr
  file-extension: abr
  endian: be
  ks-opaque-types: true
types:
  header:
    seq:
      - id: version
        type: u2
      - id: subversion
        type: u2
  section:
    seq:
      - id: tag
        type: u4
        enum: tag
      - id: subtag
        type: u4
        enum: subtag
      - id: body_len
        type: u4
      - id: body
        size: body_len
        type:
          switch-on: subtag
          cases:
            'subtag::samp': samples_section_body
            'subtag::desc': descriptors_section_body
            'subtag::phry': hierarchies_section_body
      - id: padding
        if: not _io.eof
        size: -body_len % 4
        
  samples_section_body:
    seq:
      - id: samples
        type: sample
        repeat: eos
        
  sample:
    seq:
      - id: sample_len
        type: u4
      - id: data
        type: sample_data
        size: sample_len
      - id: padding
        size: -sample_len % 4
        
  sample_data:
    seq:
      - id: id_len
        type: u1
      - id: brush_id
        size: id_len
      - id: body_v62
        type: v62
        if: _root.header.subversion == 2
      - id: body_v61
        type: v61
        if: _root.header.subversion == 1
        
  v61:
    seq:
      - id: unknown
        size: 10
      - id: image_data
        type: image_data

  v62:
    seq:
      - id: meta_len
        type: u2
      - id: meta_a
        type: u2
      - id: version
        type: u4
      - id: length
        type: u4
      - id: bounds
        size: 16
      - id: num_channels
        type: u4
      - id: channels
        type: channel
        repeat: expr
        repeat-expr: num_channels
  
  channel:
    seq:
      - id: is_written
        type: u4
      - id: length
        type: u4
        if: is_written > 0
      - id: unused_depth
        type: u4
        if: is_written > 0 and length > 0
      - id: image_data
        type: image_data
        if: is_written > 0 and length > 0
  
  image_data:
    seq:
      - id: top
        type: u4
      - id: left
        type: u4
      - id: bottom
        type: u4
      - id: right
        type: u4
      - id: depth
        type: u2
      - id: compression
        type: u1
      - id: bitmap
        size-eos: true
  
  descriptors_section_body:
    seq:
      - id: unknown
        size: 18
      - id: item_count
        type: u4
      - id: keyed_items
        type: keyed_item
        repeat: expr
        repeat-expr: item_count
        
  hierarchies_section_body:
    seq:
      - id: unknown_data
        size-eos: true
        
  pascal_string_u4:
    seq:
      - id: str_len
        type: u4
      - id: text
        type: str
        encoding: ascii
        size: str_len
        
  compact_string:
    seq:
      - id: str_len
        type: u4
      - id: text
        type: str
        encoding: ascii
        size: "str_len > 0 ? str_len : 4"
        
  descriptor:
    seq:
      - id: class_name
        type: unicode_string
      - id: class_id
        type: compact_string
      - id: item_count
        type: u4
      - id: keyed_items
        type: keyed_item
        repeat: expr
        repeat-expr: item_count
        
  keyed_item:
    seq:
      - id: key
        type: compact_string
      - id: item
        type: typed_value
        
  descriptor_list:
    seq:
      - id: item_count
        type: u4
      - id: items
        type: typed_value
        repeat: expr
        repeat-expr: item_count
        
  unicode_string:
    seq:
      - id: utf16_char_count
        type: u4
      - id: text
        type: str
        size: utf16_char_count * 2
        encoding: UTF-16BE
        
  unit_float_value:
    seq:
      - id: unit
        type: u4
        enum: float_unit
      - id: value
        type: f8
        
  enumerated_value: 
    seq:
      - id: type
        type: compact_string
      - id: enum
        type: compact_string
        
  alias_value:
    seq:
      - id: length
        type: u4
      - id: data
        size: length
        
  typed_value:
    seq:
      - id: type
        type: u4
        enum: descriptor_type
      - id: value
        type:
          switch-on: type
          cases:
            'descriptor_type::descriptor': descriptor
            'descriptor_type::list': descriptor_list
            'descriptor_type::string': unicode_string
            'descriptor_type::unit_float': unit_float_value
            'descriptor_type::boolean': u1
            'descriptor_type::integer': s4
            'descriptor_type::double': f8
            'descriptor_type::enumerated': enumerated_value
            'descriptor_type::alias': alias_value

seq:
  - id: header
    type: header
  - id: sections
    type: section
    repeat: eos
    
enums:
  tag:
    0x3842494d: tag_8bim
  subtag:
    0x73616d70: samp
    0x64657363: desc
    0x70617474: patt
    0x70687279: phry
  descriptor_type:
    0x4f626a63: descriptor
    0x566c4c73: list
    0x54455854: string
    0x556e7446: unit_float
    0x626f6f6c: boolean
    0x6c6f6e67: integer
    0x976c6973: alias
    0x656e756d: enumerated
    0x646f7562: double
  float_unit:
    0x23416e67: angle # degrees
    0x2352736c: density
    0x23526c74: distance
    0x234e6e65: none
    0x23507263: percent
    0x2350786c: pixels
