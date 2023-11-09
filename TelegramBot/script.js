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

/*
document.getElementById('loadBlacklist').addEventListener('click', function(){
    fetch('/get_blacklist')
    .then(response => response.json())
    .then(data =>{
        const blacklist = document.getElementById('blacklist');
        blacklist.innerHTML = '';
        data.forEach(word => {
            // or use div= document.getElementById("blacklistContainer").textContent = data.blacklist;

            const listItem = document.createElement('li');
            listItem.textContent = word;
            blacklist.appendChild(listItem);
        });
    });
})*/