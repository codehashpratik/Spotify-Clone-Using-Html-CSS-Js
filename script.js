console.log("Hello World");
// initialize the variables
let songIndex=1;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongName= document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    
    {songName:"Ghum Hai Kisi Ke Pyar Mein - Raampur Ka Lakhsman ",filePath:"song/1.mp3",coverPath:"covers/1.jpg" },
    {songName:"Tum Aa Gaye Ho - Aandhi ",filePath:"song/2.mp3",coverPath:"covers/2.jpg" },
    {songName:"Mere Sapnon Ki Rani - Aradhana ",filePath:"song/3.mp3",coverPath:"covers/3.jpg" },
    {songName:"Oh Mere Dil Ke Chain - Mere Jeevan Saathi ",filePath:"song/4.mp3",coverPath:"covers/4.jpg" },
    {songName:"Tere Jaisa Yaar Kahan - Yaarana ",filePath:"song/5.mp3",coverPath:"covers/5.jpg" },
    {songName:"Rimjhim Gire Sawan( Male) - Manzil(1977) ",filePath:"song/6.mp3",coverPath:"covers/6.jpg" },
];
songItems.forEach((element , i)=>{

    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();
// Handle Play/Pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value* audioElement.duration/100;
})
const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
        element.classList.add('fa-play');
    })

}
Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e);

        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused){
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            mastersongName.innerText=songs[songIndex-1].songName;
            audioElement.src = `song/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause'); 

        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play'); 


        }
        
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=1
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=6
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
