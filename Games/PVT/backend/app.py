from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_results():
    # Extract the data from request
    data = request.json
    # Normally you would store the data in a database or file
    # For demonstration, just print it
    print(data)
    # Return a simple acknowledgment
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
