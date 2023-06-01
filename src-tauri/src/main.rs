#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

use tauri::{Manager, WindowEvent, CustomMenuItem, Menu, MenuItem, Submenu};
use tauri_plugin_log::{LogTarget};
// use window_shadows::set_shadow;
use tauri_plugin_store;
use std::env;
use window_ext::WindowExt;

mod window_ext;

#[tauri::command(async)]
async fn app_ready(app_handle: tauri::AppHandle) {
	let window = app_handle.get_window("main").unwrap();

	window.show().unwrap();
}

fn main() {
    let context = tauri::generate_context!();
    env::set_var("RUST_BACKTRACE", "1");

    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_log::Builder::default().targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview]).build())
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_transparent_titlebar(true);
            window.position_traffic_lights(15.0, 19.0);
            // set_shadow(&window, true).expect("Unsupported platform!");
            window.open_devtools();
            Ok(()) // need this
        })
        .on_window_event(|e| {
            let apply_offset = || {
                let win = e.window();
                win.position_traffic_lights(15., 19.);
            };

            match e.event() {
                WindowEvent::Resized(..) => apply_offset(),
                WindowEvent::ThemeChanged(..) => apply_offset(),
                _ => {}
            };
        })
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .invoke_handler(tauri::generate_handler![app_ready,])
        .run(context)
        .expect("error while running tauri application");
}
