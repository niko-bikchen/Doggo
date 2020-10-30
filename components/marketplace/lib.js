import PhoneIcon from "@material-ui/icons/Phone";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ViberIcon from "../ViberIcon";
import React from "react";

export const contactIconsMap = {
    "phone": <PhoneIcon style={{padding:"2px",color:"white", backgroundColor:"#2CBB00",borderRadius:"4px"}}/>,
    "telegram": <TelegramIcon style={{padding:"2px",color:"white",backgroundColor:"#279EDA",borderRadius:"4px"}}/>,
    "whatsapp": <WhatsAppIcon style={{padding:"2px", color: "white",backgroundColor:"#4AC358",borderRadius:"4px" }}/>,
    "viber": <ViberIcon style={{padding:"2px",color:"white",backgroundColor:"#665CAC",borderRadius:"4px"}}/>
}

export const textSplit = ({length, text}) => {
    length -= 3
    return text.length >= length ? text.substring(0, length) + "..." : text
}
