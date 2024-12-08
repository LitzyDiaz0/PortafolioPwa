if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("./seviceworker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error al registrar el Service Worker:", err));
}
