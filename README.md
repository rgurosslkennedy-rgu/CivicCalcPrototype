# Civic Social Protection Engine

An independent, highly accessible open-source framework built to calculate statutory benefits, healthcare safety nets, and local assistance programs for Nigeria and Zimbabwe.

## ⚖️ Digital Public Good (GPLv3)
This software belongs entirely to the public domain under the **GNU General Public License v3.0**.
 - **Always Free:** No corporation, private entity, or individual can ever privatize, commercialize, or lock this mathematical code behind a paywall.
- **Copyleft Enforcement:** Any modified versions or forks of this calculation engine must also be made public under the exact same open license.

## 🚀 Local Desktop Installation (Fedora)
This application has **zero external dependencies** and runs entirely in your web browser.

1. Open your terminal and move to the folder:
   ```bash
   cd ~/CivicCalcPrototype
   ```
2. Start the secure internal web server:
   ```bash
   python3 -m http.server 8501 --bind 127.0.0.1
   ```
3. Open your browser and navigate to: `http://localhost:8501`

## 🌍 Supported Modules
- **Nigeria:** PenCom formal sector math (8%/10% split), NHIA health premiums (5%/10% split), and voluntary Micro Pension Plan paths.
- **Zimbabwe:** NSSA retirement parameters and automated $700 insurable income ceiling clamping rules.
- **Accessibility:** Integrated high-contrast display parameters, system text scaling, and client-side English text-to-speech audio rendering.
