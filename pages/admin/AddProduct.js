import Uploader from "../../components/ImageUpload/Uploader";

const NewProduct = () => {
    return ( 
        <>
        <h3>ادخل معلومات المنتوج</h3>
        <div className="new_product">
            <form >
                <div className="product_form">
                    <label htmlFor="product-name">اسم المنتوج</label>
                    <input type="text" name="product-name" />
                    <label htmlFor="product-price">سعر المنتوج</label>
                    <input type="text" name="product-price" />
                    <label htmlFor="product-category">اختر قسم المنتوج</label>
                    <select name="product-category" id="">
                        <option value="Pants">سراويل</option>
                    </select>
                </div>
                <div className="image_form">
                    <label htmlFor="product-name">صورة المنتوج</label>
                    <Uploader/>
                </div>
            </form>

        </div>
        </>
     );
}
 
export default NewProduct;