const names = document.getElementById('name')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('message')
const subButton = document.getElementById('subButton')
const contactform = document.getElementById('contact-form')


contactform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formdata = {
        name : names.value,
        email : email.value,
        subject : subject.value,
        message : message.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST",'/contact')
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = ()=>{
        if(xhr.responseText == "success"){
            alert('email send');
            names.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        }else{
            alert('email failed to send')
        }
    }

    xhr.send(JSON.stringify(formdata))
})
