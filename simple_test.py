from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Hello World! Flask is working!</h1>'

@app.route('/test')
def test():
    return '<h1>Test page works!</h1>'

if __name__ == '__main__':
    print("Starting simple Flask test...")
    app.run(debug=True, host='127.0.0.1', port=5000)