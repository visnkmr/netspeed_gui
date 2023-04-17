const { invoke } = window.__TAURI__.tauri;
// import { appWindow } from '@tauri-apps/api/tauri'

let greetInputEl;
let greetMsgEl;

async function greet(whatever) {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: whatever });
}
async function button1_clicked() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("button1_clicked");
}
async function button2_clicked() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  await invoke("button2_clicked");
}
async function exit() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  await invoke("exit");
}
async function movewindow() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  await invoke("startmove");
}
async function stopmovewindow() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  await invoke("startmove");
}
function startstopmovewindow(e){
  // {
    // tauri.invoke('drag_window');
    if (e.buttons === 1 && e.target.tagName !== 'BUTTON') 
    {
      // tauri.invoke('drag_window');
      // if (e.target.hasAttribute('data-tauri-drag-region') && e.buttons === 1) 
      movewindow()
    }
  // }
}
window.addEventListener('mousedown', (e) => startstopmovewindow(e));
window.addEventListener('mouseup', (e) => startstopmovewindow(e));

window.addEventListener("DOMContentLoaded", () => {
  const source = new EventSource("http://127.0.0.1:6798/stream");

// listen for messages
  source.onmessage = function(event) {
    // parse the JSON data
    const data = JSON.parse(event.data);

    // display the data in HTML
    document.getElementById("showspeed").innerHTML = data.message;
  };
  // greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  // document
  //   .querySelector("#greet-button")
  //   .addEventListener("click", () => greet(greetInputEl.value));
  
  document
    .querySelector("#other")
    .addEventListener("mousedown", () => movewindow());
  document
    .querySelector("#other")
    .addEventListener("mouseup", () => stopmovewindow());
    document
    .querySelector("#start")
    .addEventListener("click", () => button2_clicked());
    // .addEventListener("click", () => greet("start"));
    document
    .querySelector("#stop")
    // .addEventListener("click", () => greet("stop"));
    // .addEventListener("click", () => button2_clicked());
    // .addEventListener("mousedown", () => appWindow.startDragging());
    .addEventListener("mousedown", () => exit());
});

