$(document).ready(function () {
    const port = 80;
    const socket = io.connect(`http://localhost:${port}`);
    let newId="";
    $('.send').on('click', (e)=>{
        e.preventDefault();
        let text = $('.text').val();
        if(newId.length>0){
            socket.emit("privat", newId, text);
        }else{
            socket.emit("newMsg", text);
        }
    });
    socket.on("allUsers", (name, text) => {
        $('.wrap').append(`<p style="color:red" data-id="${name}">${new Date().toLocaleTimeString()} ${name}: ${text}</p>`);
    });
    socket.on("iLoveMe", (text) => {
        $('.wrap').append(`<p style="color:green">iLoveMe: ${text}</p>`);
    });
    socket.on("privats", (id, text) => {
        $('.wrap').append(`<p style="color:purple">${id}: ${text}</p>`);
    });
    $('.wrap').on('click', "p", function () {
        newId = $(this).attr('data-id');
        $('.text').val(newId);
        console.log(newId)
    })
});