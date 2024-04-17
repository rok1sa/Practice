// cookie = a small text file stored on your computer
// used to remember information about the user
// saved in name=value pairs

//document.cookie = "firstName=Patrick; expires=Mon, 1 January 2030 12:00:00 UTC; path=/";
//document.cookie = "lastName=Star; expires=Mon, 1 January 2020 12:00:00 UTC; path=/";
//console.log(document.cookie);

const firstText = document.querySelector("#firstText");
const lastText = document.querySelector("#lastText");
const submitBtn = document.querySelector("#submitBtn");
const cookieBtn = document.querySelector("#cookieBtn");

submitBtn.addEventListener("click", () => {
    setCookie("firstName", firstText.value, 1);
    setCookie("lastName", lastText.value, 1);
});
cookieBtn.addEventListener("click", () => {
    firstText.value = getCookie("firstName");
    lastText.value = getCookie("lastName");
});


setCookie("firstName", "SpongeBob", 1);
setCookie("lastName", "SquarePants", 1);

console.log(getCookie("firstName"));
console.log(getCookie("lastName"));

//console.log(document.cookie);

//deleteCookie("firstName");
//deleteCookie("lastName");

console.log(document.cookie);


function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}
function deleteCookie(name){
    setCookie(name, null, null);
}
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null; 
    cArray.forEach(element =>{
        if(element.indexOf(name) == 0 ){
            result = element.substring(name.length + 1)
        }
    })
    return result
}