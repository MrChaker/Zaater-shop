import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'

function Uploader() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'var(--txt-grey)',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'var(--txt-grey)',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border .24s ease-in-out'
  };
  /* const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]); */
  return (
    <div {...getRootProps({style: baseStyle})}>
      <input {...getInputProps()} />
      
          <p>اسحب الصورة هنا للتحميل    <FontAwesomeIcon icon='plus'/></p>
      
    </div>
  )
}
export default Uploader;