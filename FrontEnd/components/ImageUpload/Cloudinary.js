function showUploadWidget() {
    cloudinary.openUploadWidget({
       cloudName: "<cloud name>",
       uploadPreset: "<upload preset>",
       sources: [
           "local",
           "google_drive",
           "facebook"
       ],
       googleApiKey: "<image_search_google_api_key>",
       showAdvancedOptions: true,
       cropping: false,
       multiple: true,
       defaultSource: "local",
       styles: {
           palette: {
               window: "#ffffff",
               sourceBg: "#f4f4f5",
               windowBorder: "#90a0b3",
               tabIcon: "#000000",
               inactiveTabIcon: "#555a5f",
               menuIcons: "#555a5f",
               link: "#0433ff",
               action: "#339933",
               inProgress: "#0433ff",
               complete: "#339933",
               error: "#cc0000",
               textDark: "#000000",
               textLight: "#fcfffd"
           },
           fonts: {
               default: null,
               "'Poppins', sans-serif": {
                   url: "https://fonts.googleapis.com/css?family=Poppins",
                   active: true
               }
           }
       }
   },
    (err, info) => {
      if (!err) {    
        console.log("Upload Widget event - ", info);
      }
     });
    }