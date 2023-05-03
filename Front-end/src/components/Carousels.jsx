import React from 'react';
import Item from './Item';
import slider from "./slider.json"
import Carousel from 'react-material-ui-carousel'

function Carousals() {
    return (
        <Carousel>
            {
                slider.map( item=> <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}


export default Carousals;