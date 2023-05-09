import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import AmenityCard from "./card";
import * as React from "react";
import backend from "../utils/config";
import {useEffect, useState} from "react";


export default function Amenities() {

    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        // Make API request to retrieve user data
        backend.get('/amenities')
            .then(response => {
                // Update state with user data
                setAmenities(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {amenities.map((amenity) => (
                <Grid key={amenity.amenityId} item xs={12} sm={6} md={4} lg={3}>
                    <AmenityCard {...amenity} />
                </Grid>
            ))}
        </Grid>
    );
}