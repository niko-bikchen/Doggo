import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {Avatar, Divider, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";
import Regions from "../map/Regions";
import _ from "underscore";
import {mapContacts} from "./lib";
const AVATAR_SIZE=200
const MARGIN_TOP=(AVATAR_SIZE/2)

const useStyles = makeStyles(theme=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const SCHEDULE_UA = {"Monday":"Понеділок", "Tuesday":"Вівторок",
    "Wednesday":"Середа","Thursday":"Четвер",
    "Friday":"П'ятниця","Saturday":"Субота","Sunday":"Неділя"}

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
                    <div style={{height:AVATAR_SIZE/2+10+"px",width:"100%"}}/>
                    <SimpleBar style={{maxHeight:"70vh"}}>
                        <Grid style={{padding:"0 20px"}} spacing={3} container>
                            <Grid xs={12} item>
                                <Typography align={"center"} variant={"h2"}>{name}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Grid justify={"space-around"} spacing={3} container>
                                    {mapContacts(contacts).map((c,i)=>{
                                        return (
                                            <Grid sm={6} md={Math.floor(12/contacts.length)} key={i+"_"} item>
                                                {c}
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            <Grid xs={12} item>
                                <Divider/>
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <Typography align={"center"} variant={"h5"}>Опис</Typography>
                                <Typography align={"justify"} style={{marginTop:"20px"}}>
                                    {description}
                                </Typography>
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <Typography align={"center"} variant={"h5"}>Графік</Typography>

                                        {_.rest(_.pairs(schedule)).map(([k,v],i)=>{
                                            return (
                                                <Grid key={i} justify={"space-around"} style={{margin:"20px 0",boxShadow:"0px 0px 15px 0px rgba(0,0,0,0.1)"}} container>
                                                    <Grid md={6}  item>
                                                        <Typography style={{padding:"10px",backgroundColor:"white"}}>{SCHEDULE_UA[k]}</Typography>
                                                    </Grid>
                                                    <Grid md={6} item>
                                                        <Typography style={{padding:"10px",backgroundColor:"white"}}>{v}</Typography>
                                                    </Grid>
                                                </Grid>)

                                        })}

                            </Grid>
                            <Grid xs={12} item>
                                {typeof google === 'undefined' || region == undefined ? '' : //TODO refactor
                                    <Regions
                                        onRegionClick={()=>{}}
                                        regions={[region]}
                                        mapProps={
                                            {
                                                containerStyle: { width: "100%", height: "500px", borderRadius: "4px" },
                                                center: region.center
                                            }
                                        } />
                                }
                            </Grid>
                        </Grid>
                    </SimpleBar>

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
                <Grid md={10} sm={11} xs={12} item>
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
                                schedule={dogwalker.schedule}
                            />
                        </div>
                    </ClickAwayListener>

                </Grid>

            </Grid>

        </Backdrop>
    )
})

export default DogwalkerDetailedCard
