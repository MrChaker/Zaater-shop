import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
    color: true
});

export default async function handler(req, res) {
    if( req. method == "PUT"){
        const { resources } = await cloudinary.v2.search
            .expression(`public_id:${req.body.public_id}`)
            .max_results(1)
            .execute();
        /* const publicIds = resources.map((file) => file.public_id); */
        var url; var color; var p;
        await cloudinary.v2.api.resource(req.body.public_id,{colors: true},(err, result)=>{
            url = result.url;
            color = result.colors[0][0]
        });
        
        res.send({url, color});
   }else {
        const result = await cloudinary.v2.uploader.unsigned_upload(req.body.file, req.body.upload_preset, { public_id: req.body.public_id });

        res.send();
   }
  }