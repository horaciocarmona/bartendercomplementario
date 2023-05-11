const socket=io()
// const carga = document.getElementById('carga')
// const chatBox=document.getElementById('chatBox')
// const messagesLogs=document.getElementById('messagesLogs')
const registro = document.getElementById('registro')
const ingreso = document.getElementById('ingreso')
const deslogeo = document.getElementById('deslogeo')

const deviceWidth="50%"

//  const source = document.getElementById('formulario-template').innerHTML;
//  const template = Handlebars.compile(source);
//  const html = template(context);
//  document.getElementById('formulario-container').innerHTML = html;

// Swal.fire({
//   title: 'Inicia sesion',
//   input: 'text',
//   text:'por favor inicie con email',
//   inputAttributes: {
//     autocapitalize: 'off'
//   },
//   inputValidator:(valor)=>{
// //    return !valor && 'Ingrese valor valido'
//     let emailField = valor;
// 	    // Define our regular expression.
//     let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
//      // Using test we can check if the text match the pattern
//     if( validEmail.test(emailField) ){
//     }else{
//       return true && 'Email is invalid, ingrese valor valido';
//     }
//   },
//   allowOutsideClick: false
// }).then((result) => {
//   emails=result.value
//   Swal.fire({
//     title: 'Inicia sesion',
//     input: 'text',
//     text:'por favor inicie sesion con nombre para seguir',
//     inputAttributes: {
//       autocapitalize: 'off'
//     },
//     inputValidator:(valor)=>{
//       return !valor && 'Ingrese valor valido'
//     },
//     allowOutsideClick: false
//   }).then((result) => {
//     user=result.value
//   })
  
// })
// chatBox.addEventListener('keyup',(e)=>{
//   if (e.key === "Enter") {
//     console.log(chatBox.value.trim().lenght)

//     if(chatBox.value.trim().length > 0){
//       socket.emit('message',{name:user,email:emails,message:chatBox.value})
//       chatBox.value=""
//     }
//   }
// })

//  ingreso.addEventListener('click',(e)=>{
//    console.log('event')
//    res.render("session");

// })  
   
// deslogeo.addEventListener('click',(e)=>{
//     console.log('event')
//     res.redirect("/api/user/login");

// })  

// registro.addEventListener('click',(e)=>{
//     console.log('event')
//     res.redirect("/api/users/loginregister");

// })  

socket.on('evento-admin',datos=>{console.log(datos)
})

socket.on('allMessages',info=>{
  console.log(info)
  messagesLogs.innerHTML=""
    info.forEach(mensaje => {
        messagesLogs.innerHTML+=`<p>${mensaje.name} dice ${mensaje.message} </p>`
    });

})

//  chatBox.addEventListener('keyup',(e)=>{
//    if (e.key === "Enter") {
//      console.log(chatBox.value.trim().lenght)
//      if(chatBox.value.trim().length > 0){
//        socket.emit('message',{name:user,email:emails,message:chatBox.value})
//        chatBox.value=""
//      }
//    }
//  })
// //    socket.emit('message',{name:user,email:emails})
// })

// ingresar.addEventListener('keyup',(e)=>{
//   if (e.key === "Enter") {

//     socket.emit('message',{name:user,email:emails})
//   }
// })

 

