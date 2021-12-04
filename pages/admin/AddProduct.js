import Uploader from "../../FrontEnd/components/ImageUpload/Uploader";
import Button from "../../FrontEnd/components/commun/Button";
import { NEW_Product, NEW_Category } from "../../FrontEnd/graphql/Mutations";
import { LOAD_Categories} from "../../FrontEnd/graphql/Queries";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import swal from 'sweetalert';
import useImageColor from "../../FrontEnd/hooks/useImageColor";

const NewProduct = () => {
    const [ createProduct ] = useMutation(NEW_Product);
    const name = useRef("");
    const price = useRef("");
    const category = useRef("");
    const images = [];
    const submit = () =>{
        createProduct({ variables: { 
            name,
            price: parseInt(price) ,
            category ,
            images ,
        }});
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
    const image = useRef("");
    console.log(image.current);
    var ImageColor = "var(--pri-theme-dark)";
    if(image.current != ""){
        const { color } = useImageColor(image.current);
        ImageColor = color 
    }
    
    return ( 
        <>
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
                    <label htmlFor="product-name">صورة المنتوج</label>
                    <img id="i" src="/images/sneaker.png" ref={image}/>
                    <Uploader/>
                </div>
                <Button 
                    /* color =  {ImageColor ? ImageColor : "var(--pri-theme-dark)"} */
                    color =  {ImageColor}
                    normal
                    text = "حفظ المعلومات"
                    block
                    onClick = {submit}
                />
            </form>

        </div>
        </>
     );
}
 
export default NewProduct;