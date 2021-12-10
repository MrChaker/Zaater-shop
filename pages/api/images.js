import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
    color: true
});
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '15mb',
      },
    },
  }
  
export default async function handler(req, res) {
    
        const result = await cloudinary.v2.uploader.unsigned_upload(req.body.file, req.body.upload_preset, { public_id: req.body.public_id });
        res.status(200).json(result)
   
  }