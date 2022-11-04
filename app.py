from flask import Flask
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/dashboard", methods=["GET"])
@cross_origin()
def fecth_algorithm_type():
    dict_result = {}
    dict_result["tasks"]=["Regression","Classification"]
    dict_result["datasets"]=["Dataset1","Dataset2"]
    dict_result["algorithms"]=["Alg1","Alg2"]
    print("fetched_types",json.dumps({"types":["Regression","Classification"]}))
    return json.dumps(dict_result),200

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
