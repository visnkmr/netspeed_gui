// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, AppHandle, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("{}", name)
}
#[tauri::command]
fn button1_clicked() -> String {
    format!("start")
}
#[tauri::command]
fn exit(app: AppHandle) {
    print!("exit callled");
  app.exit(0);
}
#[tauri::command]
fn startmove(window: Window){
    // start dragging the window when the button is clicked
    window.start_dragging().unwrap();
    // get a handle to the current window
// let window = Window::current();

// get the current window size in pixels
// let size = window.inner_size().unwrap();
// println!("{:?}", size);

// // get the current window size in logical units
// let factor = window.scale_factor().unwrap();
// // let logical = size.to_logical(factor);
// println!("{:?}", factor);
    // format!("start")
  }
//   #[tauri::command]
// fn stopmove(window: Window){
//     // start dragging the window when the button is clicked
//     window.stop_dragging().unwrap();
//     // format!("start")
//   }
const appname: &str = "ns_gui_sse";

fn main() {

  human_panic::setup_panic!(human_panic::Metadata {
    version: env!("CARGO_PKG_VERSION").into(),
    name: env!("CARGO_PKG_NAME").into(),
    authors: env!("CARGO_PKG_AUTHORS").replace(":", ", ").into(),
    homepage: env!("CARGO_PKG_HOMEPAGE").into(),
    path_to_save_log_to: prefstore::prefstore_directory(&appname.to_string()).unwrap(),
});
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler!
            [
            greet,
            button1_clicked,
            button2_clicked,
            startmove,
            exit
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

      
}

// #[tauri::command]
// fn button1_clicked() {
//   eprintln!("Button 1 clicked!");
// }

#[tauri::command]
fn button2_clicked() {
  eprintln!("Button 2 clicked!");
}