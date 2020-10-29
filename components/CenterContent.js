import React from "react"

const CenterContent = ({children}) => {
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            {children}
        </div>
    )
}

export default CenterContent
