
const Title = (props) => {
    return ( 
        <div className="section_title">
            <div className="line"></div>
            <h1>{props.text}</h1>
            <div className="line"></div>
        </div>
     );
}
 
export default Title;