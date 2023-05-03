import { Paper, Button } from '@mui/material'
import * as React from "react";
function Item({item}) {
    console.log('Image:')
    console.log(item.image)


    return (
        <Paper>
            <img style={{width:900 ,height:600}} src = {process.env.PUBLIC_URL + item.image} alt = {item.title}/>
            <h2>{item.title}</h2>

        </Paper>
    )
}

export default Item;
