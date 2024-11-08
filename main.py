from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile , Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
import uvicorn, os

# States Memmory
admin_state = {'music_name':'',
               'seek_time': ''}

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


# Client related
@app.get("/")
async def root():
    return FileResponse("static/user.html") 

@app.get('/music')
async def send_file():
    music_path = f"music/{os.listdir('music')[0]}"
    return FileResponse(music_path)


@app.websocket("/music")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    music_name = ''
    try:
        while True:
            await websocket.receive_text()
            state = ''
            if admin_state['music_name'] != music_name:
                music_name = admin_state['music_name']
                state = music_name
            await websocket.send_text(state)
            
    except WebSocketDisconnect:
        print(f" disconnect")

@app.websocket("/seekit")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    seek_time = ''
    try:
        while True:
            await websocket.receive_text()
            state = ''
            if admin_state['seek_time'] != seek_time:
                seek_time = admin_state['seek_time']
                state = seek_time
            await websocket.send_text(state)

    except WebSocketDisconnect:
        print(f" disconnect")

# Admin related
@app.get("/admin")
async def get():
    return FileResponse("static/admin.html")

@app.post('/upload') 
async def uploaded_audio(audio: UploadFile = File(...)):
    [os.remove(file.path) for file in os.scandir('music')]
    file_name = audio.filename
    contents = await audio.read()
    with open(f"music/{file_name}", "wb") as f:
        f.write(contents)
    admin_state['music_name'] = audio.filename
    return f"File '{file_name}' uploaded successfully!"

@app.post("/seeked")
async def receive_seek_time(request: Request):
    seek_time = await request.body()
    seek_time = seek_time.decode("utf-8")  # Decode from bytes to string
    admin_state["seek_time"] = seek_time
    return "Seek time received successfully"


if __name__ == '__main__':
    uvicorn.run("main:app", host="192.168.1.7", port=7000, reload=True)