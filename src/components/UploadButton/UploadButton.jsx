import React from 'react'

export default function UploadButton() {
  return (
    <div>
      Test Test Test
      <br />
      <Button
        variant="contained"
        component="label"
        // onClick={event => handleFile(event.target.files[0])}
        onChange={event => handleFile(event.target.files[0])}
      >
        Upload File
        <input
          type="file"
          hidden
        // style={{ display: 'none' }}

        />
      </Button>
    </div>
  )
}
