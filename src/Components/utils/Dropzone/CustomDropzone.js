import { CardMedia } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '250px',
  width: '250px',
  borderWidth: 2,
  borderRadius: "10%",
  borderColor: 'grey',
  borderStyle: 'dashed',
  backgroundColor: 'grey',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export const StyledDropzone = (props) => {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    'image/jpeg': [],
    'image/png': [],
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => {
    return (<div key={file.path}>
      <img src={file.preview} alt={file.path} /><div>
        <p>{file.path}</p>
        <p>{file.size} bytes</p>
      </div>
    </div>
    );
  })
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  return (
    <>
      {files.length <= 0 && <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#fff",
              alignItems: "center",

            }}    >Drag and drop image</p>
        </div>
      </div>}
      {files.length > 0 && (
        <CardMedia
          component="img"
          image={files[0].preview}
          alt="album cover"
          sx={{
            height: "250px",
            width: "250px",
            borderRadius: "10%",
          }}
        />)
      }
    </>
  );
}

<StyledDropzone />