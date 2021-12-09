import cloudinary from 'cloudinary';
const cloud = cloudinary.config({
    /* cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_NAME_API_KEY,
    api_secret: process.env.CLOUD_NAME_SECRET, */
    cloud_name: "dmu5btk3s",
    api_key: "919245522713464",
    api_secret: "SR24aE_61br_Dh_2IFUtn0BUsKE",
    secure: true,
    color: true
});

export default cloud;