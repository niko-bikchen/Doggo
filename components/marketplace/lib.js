import PhoneIcon from "@material-ui/icons/Phone";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ViberIcon from "../ViberIcon";
import React, {useCallback} from "react";
import * as _ from "underscore";
import Button from "@material-ui/core/Button";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {useSnackbar} from "notistack";

export const contactIconsMap = {
    "phone": <PhoneIcon style={{padding:"2px",color:"white", backgroundColor:"#2CBB00",borderRadius:"4px"}}/>,
    "telegram": <TelegramIcon style={{padding:"2px",color:"white",backgroundColor:"#279EDA",borderRadius:"4px"}}/>,
    "whatsapp": <WhatsAppIcon style={{padding:"2px", color: "white",backgroundColor:"#4AC358",borderRadius:"4px" }}/>,
    "viber": <ViberIcon style={{padding:"2px",color:"white",backgroundColor:"#665CAC",borderRadius:"4px"}}/>
}

const ContactButton = ({type,text}) => {
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const onCopy = useCallback((text)=>()=>{
        enqueueSnackbar('Copied '+text,{variant:'success',autoHideDuration:3000})
    },[enqueueSnackbar])
    return (
        <CopyToClipboard text={text} onCopy={onCopy(text)}>
            <Button style={{padding: "5px"}} startIcon={contactIconsMap[type]}>{text}</Button>
        </CopyToClipboard>
    )
}
export const mapContacts = contacts => _.map(contacts, ({value,type}, i) => (<ContactButton text={value} type={type}/>))
/*export const mapContacts = contacts => _.map(contacts, (c, i) => (
    <CopyToClipboard text={c.value} key={i+"_cptcbbtn"}>
        <Button style={{padding: "2px"}} startIcon={contactIconsMap[c.type]}>{c.value}</Button>
    </CopyToClipboard>))*/


export const textSplit = ({length, text}) => {
    length -= 3
    return text.length >= length ? text.substring(0, length) + "..." : text
}
