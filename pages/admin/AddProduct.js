import Uploader from "../../FrontEnd/components/ImageUpload/Uploader";
import Button from "../../FrontEnd/components/commun/Button";
import { NEW_Product, NEW_Category, IMAGE_UPLOAD } from "../../FrontEnd/graphql/Mutations";
import { LOAD_Categories} from "../../FrontEnd/graphql/Queries";
import { useRef, useState, useEffect, createContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import swal from 'sweetalert';


export const UplaodContext = createContext({});
const NewProduct = () => {

    const [ createProduct ] = useMutation(NEW_Product);
    const name = useRef("");
    const price = useRef("");
    const category = useRef("");
    const description = useRef("");

    const [ ImageFile, setImageFile ] = useState([]);
    const [ images, setImages ] = useState([]);
    const [ imagesRes, setImagesRes ] = useState([]);

    const [ uploadImage ] = useMutation(IMAGE_UPLOAD, {
        onCompleted(data){
                data.uploadImage.forEach((ig)=>{
                    setImagesRes(imagesRes.push({
                        path: ig.path,
                        color: ig.color
                    }))
                })
                createProduct({ variables: { 
                    name: name.current.value,
                    price: parseInt(price.current.value) ,
                    category: category.current.value ,
                    description: description.current.value ,
                    images : imagesRes
                }});
                swal("تمت اضافة منتج جديد",  {icon: "success"});
        },
        onError(){
            swal(".فشل العملية ، حاول من جديد", {icon: "warning"});
        }
    });

    const submit = (e) => {
        e.preventDefault();
        setImages([]);
        ImageFile.forEach((image, i)=>{
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend =  () => {
                setImages(images.push(reader.result));
                if ( i == ImageFile.length - 1 ){
                    swal("...يتم الان تحميل المنتج",{ buttons: false, icon: "success"});
                    uploadImage({ variables: {
                        files: images,
                        public_id: name.current.value
                    }})
                }
            };
        });        
    }
    

    const [ createCategory] = useMutation(NEW_Category);
    const newCategoryName = useRef("");
    const newCategoryArabic = useRef("");

    const [ categoryInput, setCategoryInput] = useState(false);
    const addCategory = () => {
        if(newCategoryName.current.value != "" && newCategoryArabic.current.value != ""){
            createCategory({ variables: { 
                name: newCategoryName.current.value,
                arabic: newCategoryArabic.current.value
            }});
            setCategoryInput(false);
            
            swal("تمت اضافة قسم جديد");
        }
    }

    const { loading, data } = useQuery(LOAD_Categories);
    const [ categories, setCategories]= useState([]);
    useEffect(()=>{
        if(data){
            setCategories(data.getCategories);
        }
    },[loading]) ;
    
    return ( 
      <UplaodContext.Provider value={{ImageFile, setImageFile}}>
        <h3>ادخل معلومات المنتوج</h3>
        <div className="new_product">
            <form >
                <div className="product_form">
                    <label htmlFor="product-name">اسم المنتوج</label>
                    <input type="text" name="product-name" ref={name}/>
                    <label htmlFor="product-price">سعر المنتوج</label>
                    <input type="text" name="product-price"  ref={price}/>
                    <label htmlFor="product-category">اختر قسم المنتوج</label>
                    <select name="product-category" id="" ref={category} onChange={ () => setCategoryInput(false)}>
                        {
                            categories.map((ct, i)=>(
                                <option value={ct.name} key={i}>{ct.arabic}</option>
                            ))
                        }
                        <option value="new" onClick={()=>setCategoryInput(true)}> أضف قسم اخر</option>

                    </select>
                    <div className={ categoryInput ? "new_category" : "OFF"}>
                        <label htmlFor="new-category"> اضافة قسم جديد بالفرنسية</label>
                        <input type="text" 
                            id="add_category" 
                            ref={newCategoryName}
                        />
                        <label htmlFor="new-category"> اضافة قسم جديد بالعربية</label>
                        <input type="text" 
                            id="add_category" 
                            ref={newCategoryArabic}
                        />
                        <Button 
                            color = "var(--pri-theme-dark)"
                            normal
                            text = "تأكيد"
                            onClick = {addCategory}
                            block
                        />
                    </div>
                    

                </div>
                <div className="image_form">
                    <label htmlFor="product-name">صور المنتوج</label>
                    <Uploader />
                </div>
                <div className="product-desciption">
                    <label htmlFor="product-desciption">وصف المنتوج</label>
                    <textarea name="desciption" ref={description} cols="30" rows="5"></textarea>
                </div>
                <Button 
                    color =  "var(--pri-theme-dark)"
                    normal
                    text = "حفظ المعلومات"
                    block
                    onClick = {(e)=>{
                        submit(e);
                    }}
                />
            </form>

        </div>
     </UplaodContext.Provider >
     );
}
 
export default NewProduct;