import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Rustcity's Rewards App",
    "short_name": "RustcityRewardsApp",
    "icons": [
      {
        "src": "/icons/android/android-launchericon-192-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/android/android-launchericon-512-512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#fca127",
    "background_color": "#ca382a",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait",
    "permissions": {
      "camera": {}
    }
  }
}