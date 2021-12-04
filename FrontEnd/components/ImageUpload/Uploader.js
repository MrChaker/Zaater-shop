import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function Uploader() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    placeContent: 'center',
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
          <FontAwesomeIcon icon='tshirt' color="var(--bg-grey)" size="10x"/>
          <p style={{ marginTop: 16}}>اسحب الصورة هنا للتحميل    <FontAwesomeIcon icon='upload'/></p>
      
    </div>
  )
}
export default Uploader;