import os
import json
import base64
from http.server import HTTPServer, BaseHTTPRequestHandler

SAVE_DIR = r"c:\Users\ADM\onira-labs\clientes\ioshi-sushi\assets\pratos"
os.makedirs(SAVE_DIR, exist_ok=True)

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.end_headers()

    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_len)
        try:
            data = json.loads(post_body.decode("utf-8"))
            filename = data["filename"]
            b64_data = data["data"]
            if "," in b64_data:
                b64_data = b64_data.split(",")[1]
            
            filepath = os.path.join(SAVE_DIR, filename)
            with open(filepath, "wb") as f:
                f.write(base64.b64decode(b64_data))
            
            print(f"Saved {filename} ({len(b64_data)} bytes base64)")
            
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
        except Exception as e:
            print("Error saving:", e)
            self.send_response(500)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(str(e).encode("utf-8"))

def run():
    server = HTTPServer(("127.0.0.1", 8765), Handler)
    print("Receiver server running on http://127.0.0.1:8765...")
    server.serve_forever()

if __name__ == "__main__":
    run()
