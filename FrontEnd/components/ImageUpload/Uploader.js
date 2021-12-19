import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {useCallback, useContext, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { UplaodContext } from "../../../pages/admin/AddProduct";
function Uploader() {
  const {ImageFile, setImageFile} = useContext(UplaodContext);
  const [previewSource, setPreviewSource] = useState('');


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    previewFile(acceptedFiles[0]);
    setImageFile(acceptedFiles);
    /*  */
  }, [ImageFile]);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
  };

  
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 300,
    width: 240,
    placeContent: 'center',
    padding: '20px',
    marginBottom: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'var(--txt-grey)',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'var(--txt-grey)',
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center'
  };
  
  
  return (
          <>
            <div {...getRootProps({style: baseStyle})}>
              {
                !previewSource && (
                  <>
                  <FontAwesomeIcon icon='tshirt' color="var(--bg-grey)" size="10x"/>
                  </>
                )}
                {
                    previewSource && (
                      <img
                          src={previewSource}
                          alt="chosen"
                          style={{ height: '250px' }}
                      />
                  )
                } 
                  <input {...getInputProps()} />
                  <p style={{ marginTop: 16}}>اسحب الصورة هنا للتحميل    <FontAwesomeIcon icon='upload'/></p>
            </div>
            
                
          </>
  )
}
export default Uploader;