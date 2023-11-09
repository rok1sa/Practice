console.log('hejji');
var1 = 15; 
if (var1 >= 15){
    console.log(`The {var1} is >=15`)
}


document.addEventListener('DOMContentLoaded', function(){
    const blacklistElementForDisplay = document.getElementById('blacklist');
    const loadBlacklistButton = document.getElementById('loadBlacklist');

    loadBlacklistButton.addEventListener('click', function(){
        fetch('/get_blacklist')
        .then(response => response.json())
        .then(data =>{
            const blacklist = data.blacklist;

            blacklistElementForDisplay.innerHTML = '';
    
            blacklist.forEach(word =>{
                const blElement = document.createElement('div');
                blElement.textContent = word;
                blacklistElementForDisplay.appendChild(blElement);
            });
        });

    });
});
