const FileUpload = (url, File, cloudinaryPreset) => {
        const formData = new FormData();
        formData.append("file", File);
        if( cloudinaryPreset != undefined ){
        formData.append("upload_preset", cloudinaryPreset);
        }
        fetch( url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          credentials: 'same-origin', // include, *same-origin, omit
          body: formData // body data type must match "Content-Type" header
        })
          .then(()=> {
            fetch("/api/images",{
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
              },
              
            })
          })
          .then(res => res.json())
          .then( data => {
            return data;
          } )
          .catch(err=> console.log(err));
      
}
 
export default FileUpload;