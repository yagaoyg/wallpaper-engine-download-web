# Wallpaper Engine Download Web

> Download all wallpapers for Wallpaper Engine without logging in.

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

Note: Depending on abusive usage, this project may later keep only the video download option if necessary; otherwise, the current behavior will remain unchanged.
【This project is for emergency entertainment use only. Do not treat it as a justification for cracking or piracy.】

## Badges

[![version](https://img.shields.io/badge/version-2.0.0-3fb950?style=flat-square)](https://semver.org/)
[![node](https://img.shields.io/badge/node-%3E%3D16-43853d?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![runtime](https://img.shields.io/badge/runtime-Node.js-5fa04e?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/en/about)
[![downloader](https://img.shields.io/badge/downloader-SteamCMD-1b2838?style=flat-square&logo=steam&logoColor=white)](https://developer.valvesoftware.com/wiki/SteamCMD)
[![frontend](https://img.shields.io/badge/frontend-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![dependency](https://img.shields.io/badge/dependency-zero-0ea5e9?style=flat-square)](https://nodejs.org/docs/latest/api/)

## Tech Stack

<p>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" /></a>
  <a href="https://developer.valvesoftware.com/wiki/SteamCMD" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/steam/ffffff" alt="SteamCMD" width="48" height="48" /></a>
  <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=js,html,css" alt="JavaScript, HTML, CSS" /></a>
</p>

## Project Introduction

This tool is designed to retrieve and download wallpaper data from the Steam Workshop for Wallpaper Engine. It allows users to browse and download wallpapers directly through a web interface.

**Key Advantage**: It utilizes **SteamCMD**'s anonymous login feature to download workshop items, eliminating the need to log in to a Steam account for most free wallpapers.

## Core Features

- **No Login Required**: Leverages SteamCMD anonymous login to download resources.
- **Smart Parsing**: Automatically scrapes Workshop pages to retrieve File IDs and metadata.
- **Automatic Packaging**:
  - **Scene/App/Web Wallpapers**: Automatically packaged into `.zip` files.
  - **Video Wallpapers**: Downloads the raw video file directly for immediate playback.
- **Zero Dependency**: Built with pure Node.js (standard libraries only), no `npm install` required.
  
## 截图展示

<img width="1573" height="1142" alt="123123123" src="https://github.com/user-attachments/assets/624f6abe-1fd6-4ffe-afb4-b93a40ead201" />
</br>
<img width="1573" height="1351" alt="SnowShot_2026-03-08_13-57-40" src="https://github.com/user-attachments/assets/6903ac0e-3bcc-4f1e-9446-c3b2e0f65ca1" />
</br></br>
<img width="32%" height="1223" alt="333" src="https://github.com/user-attachments/assets/397b907a-b7fc-4b3c-b5da-0580b948e342" />
<img width="32%" height="1223" alt="444" src="https://github.com/user-attachments/assets/a3fe9cce-d0d4-4559-8511-1c52d3a9759e" />
<img width="32%" height="1224" alt="SnowShot_2026-03-08_13-54-12" src="https://github.com/user-attachments/assets/9f789a17-bbf1-4013-a72b-94036fe345fe" />
</br></br>
<img width="32%" height="1223" alt="111" src="https://github.com/user-attachments/assets/2882fcd9-023f-4952-bf9b-18e624f79e3c" />
<img width="32%" height="1223" alt="222" src="https://github.com/user-attachments/assets/36db3d9b-1074-4b9a-bc73-d405e21d5964" />
<img width="32%" height="1223" alt="555" src="https://github.com/user-attachments/assets/635a22c1-258a-469c-95fb-0cf00185892a" />

## Technical Architecture

- **Runtime**: Node.js (>=16)
- **Core Downloader**: [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve's command-line Steam client)
- **Frontend**: Vanilla JavaScript (No frameworks)
- **Backend**: Native Node.js `http` module

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or later) is installed.
2. **Network Access (Region-dependent)**: Whether a proxy is required depends on your network location. If Steam Workshop is directly reachable in your region, no proxy is needed. If access is restricted, enable a system proxy or configure proxy environment variables.
3. **SteamCMD**: The tool will attempt to automatically find or download SteamCMD. If it fails, you may need to install it manually.

## Quick Start

1. **Clone/Download** this repository.
   This project requires the Node.js runtime environment.
2. **Start the Server**:
   ```bash
   node server.js
   ```
3. **Open Browser**: Visit `http://localhost:3090` (or the port displayed in the console).

## Configuration (Optional)

You can configure the tool using Environment Variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Web server port | `3090` |
| `HTTP_PROXY` | Proxy URL (e.g., `http://127.0.0.1:7890`) | System Default |
| `STEAM_USERNAME` | Steam Account (if anonymous fails) | - |
| `STEAM_PASSWORD` | Steam Password | - |
| `STEAM_COUNTRY` | Store Country Code | - |
| `STEAM_LANG` | Store Language | `schinese` |

> **Note**: While the tool aims to be login-free, some wallpapers may strictly require a valid Steam account. In such cases, you can set `STEAM_USERNAME` and `STEAM_PASSWORD`.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=0ran/wallpaper-engine-download-web&type=Date)](https://star-history.com/#0ran/wallpaper-engine-download-web&Date)


## Development Statement

This project was constructed with the assistance of artificial intelligence. It is provided "as-is" for educational and personal use.
