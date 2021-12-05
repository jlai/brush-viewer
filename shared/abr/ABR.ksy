meta:
  id: abr
  file-extension: abr
  endian: be
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
      - id: unknown
        size: 264
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
      - id: unknown_data
        size-eos: true
        
  hierarchies_section_body:
    seq:
      - id: unknown_data
        size-eos: true
        
  pascal_string_u4:
    seq:
      - id: str_len
        type: u4
      - id: value
        type: str
        encoding: ascii
        size: str_len

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
