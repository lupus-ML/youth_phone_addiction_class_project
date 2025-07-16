from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Main App Test</title>
        <style>
            body { background: #1a1a1a; color: white; padding: 20px; }
            .slider { width: 300px; }
        </style>
    </head>
    <body>
        <h1>🔧 Main App Working!</h1>
        <div>
            <label>Test Slider: <span id="value">5</span></label><br>
            <input type="range" id="slider" min="1" max="10" value="5" class="slider">
        </div>
        <script>
            document.getElementById('slider').addEventListener('input', function() {
                document.getElementById('value').textContent = this.value;
            });
        </script>
    </body>
    </html>
    '''

if __name__ == '__main__':
    print("🚀 Testing main app...")
    app.run(debug=True, host='127.0.0.1', port=5000)