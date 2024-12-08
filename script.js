//este script valida que este el serice worker sino lo crea
if ('serviceWorker' in navigator) {
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('./seviceworker.js')
        .then(registro => {
            console.log("El service worker se registro de manera correcta");
        })
        .catch(e =>{
            console.warn("El service worker no se registro",e);
        })
    })
}