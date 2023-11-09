console.log('hejji');
var1 = 15; 
if (var1 >= 15){
    console.log(`The {var1} is >=15`)
}


document.addEventListener('DOMContentLoaded', function(){
    const blacklistElementForDisplay = document.getElementById('blacklist');

    fetch('/get_blacklist')
    .then(response => response.json())
    .then(data =>{
        const blacklist = data.blacklist;

        blacklist.forEach(word =>{
            document.getElementById('blacklist').textContent = data.blacklist;
        })
    })
}) 
