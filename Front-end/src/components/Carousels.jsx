import React from 'react';
import Carousel from 'react-material-ui-carousel'


const slider = [
    {
        "id": 1,
        "image": "/static/slideshow_images/jacuzzi.webp",
        "title": "Jacuzzi"
    },
    {
        "id": 2,
        "image": "/static/slideshow_images/pool.jpeg",
        "title": "Swimming Pool"
    }
]


function Carousals() {

    return (
        <Carousel>
            {
                slider.map(item => <Item key={item.id} item={item}/>)
            }
        </Carousel>
    )
}

function Item({item}) {
    return (
        <center>
            <img className="center-image" style={{width: 1300, height: 650}} src={process.env.PUBLIC_URL + item.image}
                 alt={item.title}/>
        </center>
    )
}

export default Carousals;