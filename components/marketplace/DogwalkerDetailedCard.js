import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {Avatar, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
const AVATAR_SIZE=200
const MARGIN_TOP=(AVATAR_SIZE/2)

const useStyles = makeStyles(theme=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

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

export const DogWalkerDetailedCardModal = forwardRef(({},ref)=>{
    const classes = useStyles();
    let openedTime;
    const [open,setOpen] = useState(false)
    const [dogwalker,setDogwalker] = useState({})
    useImperativeHandle(ref,()=>({
        open:({dogwalker})=>{
            console.log(dogwalker)
            setDogwalker(dogwalker)
            setOpen(true)
        },
        close:()=>{
            setOpen(false)
        }
    }))
    useEffect(()=>{openedTime = Date.now()},[open])
    return (
        <Backdrop
            ref={ref}
            open={open}
            className={classes.backdrop}
        >
            <Grid style={{width: "100vw", height: "100%"}} justify={"center"} container>
                <Grid md={6} xs={10} item>
                    <ClickAwayListener onClickAway={() =>{
                        if(open && Date.now() - openedTime > 100){
                            setOpen(false)
                        }
                    }}>
                        <div style={{marginTop:"20px"}}>
                            <DogwalkerDetailedCard
                                name={dogwalker.name}
                                avatar_url={dogwalker.avatar_url}
                                description={dogwalker.description}
                                contacts={dogwalker.contacts}
                                region={dogwalker.region}
                            />
                        </div>
                    </ClickAwayListener>

                </Grid>

            </Grid>

        </Backdrop>
    )
})

export default DogwalkerDetailedCard
