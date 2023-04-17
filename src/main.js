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
let last_upload, last_download, upload_speed, down_speed

ssestart()

function ssestart(){
  const source = new EventSource("http://127.0.0.1:6798/stream");

// listen for messages
  source.onmessage = function(event) {
    console.log(event)
    // parse the JSON data
    const data = JSON.parse(event.data);
    let upload=data[0]
    let download=data[1]
    let todaytotal=data[2]

    if (last_upload > 0){
       if( upload < last_upload)
                upload_speed = 0
            else
                upload_speed = upload - last_upload
    }
           

        if (last_download > 0){
           if (download < last_download)
                down_speed = 0
            else
                down_speed = download - last_download
        }
           

        last_upload = upload
        last_download = download
    // display the data in HTML
    // document.getElementById("showspeed").innerHTML = size(down_speed,false)+"ps↓ "+ size(upload_speed,false)+"ps↑ "+ size(todaytotal,true);
    document.getElementById("showspeed").innerHTML =down_speed+"ps↓ "+ upload_speed+"ps↑ "+ todaytotal;
  };
}

function size(speed,isbytes){
  speed
}
