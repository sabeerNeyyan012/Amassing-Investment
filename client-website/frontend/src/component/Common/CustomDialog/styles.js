export const styles = (theme) => ({
    root: {
        "& .MuiPaper-root": {
            borderRadius: "8px",
            backgroundColor: "white"
        },
        "& .MuiDialogContent-root": {
            maxWidth: "100%",
            "& p": {
                fontSize: "18px"
            }
        },
        "& .MuiDialogTitle-root": {
            "& .close-btn": {
                display: "inline-block",
                width: "fit-content",
                position: "absolute",
                top: "12px",
                right: "16px",
                height: '40px',
                lineHeight: 'normal',
                padding: '0',
                width: '40px',
            }
        },
    },
    ModelTopTitle:{
        display:'flex',
        alignItems:'center',
        borderBottom:'1px solid #ddd'
    }
});