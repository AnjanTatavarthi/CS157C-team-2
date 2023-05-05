function Item({item}) {
    return (
        <center>
            <img className  = "center-image"style={{ width: 1200, height: 600}} src = {process.env.PUBLIC_URL + item.image} alt = {item.title}/>
        </center>
    )
}

export default Item;
