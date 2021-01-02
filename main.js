const { app, BrowserWindow, screen } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 620,
    height: 400,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("ready", () => {
  // get the mouse position
  setInterval(() => {
    global.mousePos = screen.getCursorScreenPoint();
    global.screenSize = screen.getPrimaryDisplay().size;
  }, 10);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
