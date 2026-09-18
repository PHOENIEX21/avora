# AVORA V9.0.6 — Fast Navigation / Genuine Connection Loader

This patch removes the route-loading overlay from normal AVORA navigation.

- Normal page changes no longer show the full-screen loader after 450ms.
- The loader appears immediately only when the browser reports that it is offline.
- Otherwise it appears only when navigation has not completed after 3 seconds, which is treated as an unusually slow connection/server response.
- The message is connection-focused rather than pretending normal navigation requires a loading ceremony.
- No database migration or seed is required.
