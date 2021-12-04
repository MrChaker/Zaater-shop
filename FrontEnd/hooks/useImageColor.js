/* import { useEffect, useState } from "react"; */
const useImageColor = (imgEl) => {
   /*  const [ color, setColor ] = useState("");
    useEffect(()=>{ */
        
            var blockSize = 1, // only visit every 5 pixels
                defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
                canvas = document.createElement('canvas'),
                context = canvas.getContext && canvas.getContext('2d'),
                data, width, height,
                i = -4,
                length,
                rgb = {r:0,g:0,b:0},
                count = 0;
                
            if (!context) {
                return defaultRGB;
            }
            height = canvas.height = imgEl.naturalHeight-0 || imgEl.offsetHeight-0 || imgEl.height-0;
            width = canvas.width = imgEl.naturalWidth-0 || imgEl.offsetWidth-0 || imgEl.width-0; 
            context.drawImage(imgEl, 0, 0);
            
            try {
                data = context.getImageData(0, 0, width, height);
            } catch(e) {
                /* security error, img on diff domain */alert('x');
                return defaultRGB;
            }
            
            length = data.data.length;
            
            while ( (i += blockSize * 4) < length ) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i+1];
                rgb.b += data.data[i+2];
            }
            // ~~ used to floor values
            rgb.r = ~~(rgb.r/count);
            rgb.g = ~~(rgb.g/count);
            rgb.b = ~~(rgb.b/count);
            const color = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    
    return { color };
}
 
export default useImageColor;