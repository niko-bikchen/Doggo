import React from "react";
import Paper from "@material-ui/core/Paper";
import {Avatar, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
const AVATAR_SIZE=200
const MARGIN_TOP=(AVATAR_SIZE/2)
const DogwalkerDetailedCard = ({name, avatar_url="", contacts, region, description, schedule={}}) => {
    return (
        <div style={{width:"100%"}}>
            <div style={{position:"absolute",left:`calc(50% - ${AVATAR_SIZE/2}px)`,maxWidth:AVATAR_SIZE+"px",top:MARGIN_TOP-AVATAR_SIZE/2+"px"}}>
                <div style={{border:"10px solid white",width:AVATAR_SIZE+"px",borderRadius:"50%",background:"white"}}>
                    {avatar_url===""?<Skeleton  variant={"circle"} width={AVATAR_SIZE} height={AVATAR_SIZE}/>
                        :<Avatar style={{width:AVATAR_SIZE+"px",height:"auto"}} src={avatar_url}/>}
                </div>
            </div>
            <Paper style={{width:"100%",minHeight:"50vh",marginTop:MARGIN_TOP+"px",overflow:"auto"}}>
                <Grid style={{marginTop:AVATAR_SIZE/2+10+"px",padding:"0 20px"}} container>
                    <Grid xs={12} item>
                        <Typography variant={"h2"}>{name}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default DogwalkerDetailedCard
