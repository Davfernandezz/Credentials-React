let interval = null;

export const isTokenValid = (expireAt) => {

    if(interval){
        clearInterval(interval)
    }

     interval = setInterval(() => {
        console.log("interval");
        const time = new Date();
        const currentTimeStamp = Date.parse(time) / 1000;
        if (currentTimeStamp > expireAt) {
            localStorage.removeItem("passport");
            clearInterval(interval)
        }
    }, 60000);
};