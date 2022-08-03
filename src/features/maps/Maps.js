import React, {useEffect} from "react";
import {getCameraNodes, selectMaps} from "./mapsSlice";
import {useDispatch, useSelector} from "react-redux";

const google = window.google;

export function Maps(){
    const camera_nodes = useSelector(selectMaps);
    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(getCameraNodes());
    }, [])

    const initMap = () => {
        if(camera_nodes){
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: {
                    lng: 73.406149,
                    lat: 34.067195
                }
            });
            const markers = camera_nodes.map((camera)=>{
                if (!camera.live)
                    return null;
                return new google.maps.Marker({
                    position: { lat: camera.latitude, lng: camera.longitude },
                    title: camera.description,
                    map: map,
                    // icon: {
                    //     scaledSize: new google.maps.Size(10, 10),
                    //     labelOrigin: new google.maps.Point(0, -20),
                    //     backgroundColor: "#383838",
                    //     origin: new google.maps.Point(0, 0),
                    //     anchor: new google.maps.Point(0, -20),
                    // }, // For map with pin
                    // icon: '/images/transparent-1x1.png', // For map without pin
                    label: {
                        text: String(camera.id),
                        color: 'black',
                        fontSize: "10px"
                    }
                })
            })
        }
    };

    initMap();

    return (
        <div id="map" style={{
            height: "300px", width: '100%', display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        </div>
    );
}


