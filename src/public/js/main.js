const socket=io()
const carga = document.getElementById('carga')
const chatBox=document.getElementById('chatBox')
const messagesLogs=document.getElementById('messagesLogs')
let user
let emails
const deviceWidth="50%"
Swal.fire({
  title: 'Inicia sesion',
  input: 'text',
  text:'por favor inicie con email',
  inputAttributes: {
    autocapitalize: 'off'
  },
  inputValidator:(valor)=>{
//    return !valor && 'Ingrese valor valido'
    let emailField = valor;
	    // Define our regular expression.
    let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
     // Using test we can check if the text match the pattern
    if( validEmail.test(emailField) ){
    }else{
      return true && 'Email is invalid, ingrese valor valido';
    }
  },
  allowOutsideClick: false
}).then((result) => {
  emails=result.value
  Swal.fire({
    title: 'Inicia sesion',
    input: 'text',
    text:'por favor inicie sesion con nombre para seguir',
    inputAttributes: {
      autocapitalize: 'off'
    },
    inputValidator:(valor)=>{
      return !valor && 'Ingrese valor valido'
    },
    allowOutsideClick: false
  }).then((result) => {
    user=result.value
  })
  

})



chatBox.addEventListener('keyup',(e)=>{
  if (e.key === "Enter") {
    console.log(chatBox.value.trim().lenght)

    if(chatBox.value.trim().length > 0){
      socket.emit('message',{name:user,email:emails,message:chatBox.value})
      chatBox.value=""
    }
  }
})

socket.on('evento-admin',datos=>{console.log(datos)
})
socket.on('allMessages',info=>{
  console.log(info)
  messagesLogs.innerHTML=""
    info.forEach(mensaje => {
        messagesLogs.innerHTML+=`<p>${mensaje.name} dice ${mensaje.message} </p>`
    });

})


