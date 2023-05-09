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
    },
    {
        "id": 3,
        "image": "/static/slideshow_images/gym.png",
        "title": "Gym"
    },
    {
        "id": 4,
        "image": "/static/slideshow_images/movie_theater.png",
        "title": "Movie Theater"
    },
    {
        "id": 5,
        "image": "/static/slideshow_images/study_hall.png",
        "title": "Study Hall"
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