function deleteEvent(){
    let btn = document.getElementById('deleteBTN')
    let id = btn.getAttribute('data-id') // data id form button to aquire the id 
    axios.delete('/events/delete/'+ id).then((res)=>{
        console.log(res.data)
        alert('the event was deleted')
        window.location.href='/events'
    }).catch((err)=>{console.log(err)})
}

function readURL(input){
    if(input.files && input.files[0]){
        var reader = new FileReader()
        reader.onload = function(e){
            let image = document.getElementById('imageprofile')
            image.style.display='block'
            image.src = e.target.result
            console.log(e.target.result)
        } 
        reader.readAsDataURL(input.files[0])
    }
}