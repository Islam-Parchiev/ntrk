
const radioItems = document.querySelectorAll('.radio-item');
radioItems.forEach((item)=> {
    item.addEventListener('click',(e)=> {
        if (e.target.classList.contains("radio-item__play_btn") || e.target.nodeName === "path" || e.target.nodeName === "svg"||e.target.nodeName==="rect") {
            console.log("clicket btn")
            item.querySelector(".radio-item__play_btn").classList.toggle("active");
        }
        if(item.querySelector(".radio-item__play_btn").classList.contains("active")) {
            item.querySelector("audio").play();
        }
        if(!item.querySelector(".radio-item__play_btn").classList.contains("active")) {
            item.querySelector("audio").pause();
        }
    })
})


