import React from "react";
import Map from "./Map";
import {Circle} from "@react-google-maps/api";
const COLORS = ["#3573FF","#4AC358","#665CAC",
    "#ff9800","#015156","#827717"]
const regionsSorter = (a,b)=>{
    return b.radius-a.radius
}
const Regions = ({regions=[],mapProps={},onRegionClick})=>{
    const indexedRegions = regions.map((el,i)=>({...el,index:i}))
    const sortedRegions = indexedRegions.sort(regionsSorter)
    const colors = new Array(regions.length).fill(COLORS).flat();
    return (
        <Map {...mapProps}>
            {
                sortedRegions.map((r,i)=>{
                    return (
                        <Circle
                            key={i}
                            onClick={()=>onRegionClick(r)}
                            center={r.center}
                            radius={r.radius}
                            options={
                                {
                                    strokeColor:colors[i],
                                    strokeOpacity: 0.8,
                                    strokeWeight: 10,
                                    fillColor:colors[i]
                                }
                            }
                        />
                    )
                })
            }
        </Map>
    )
}

export default Regions;
