from flask import Flask
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Datasets and acceptable Tasks
datasets = {0:"Iris Dataset", 1:"Diabetes Dataset", 2:"Sample"}

metadata = {0: ["SepalWidth", "SepalLengthCm"], 1:["Age", "Height"]}
# tasks table task_id, task_name
tasks = {0:"Regression", 1:"Classification", 2:"Unsupervised"}

# relationshio table for each dataset and task
dataset_tasks = {0:[0, 1, 2], 1:[0]}

# tasks and algorithms
# algorithms table alg_id, alg_name
algorithms = {0:"Linear Regression", 1:"PCA", 2:"KNN", 3:"Naive Bayes"}

# algorithm and task relationship task_id algorith id
tasks_algos = {0:[0], 1:[2,3], 2:[1]}


@app.route("/api/get_datasets", methods=["GET"])
@cross_origin()
def get_datasets():
    # do operation for datasets
    # if we connect to mysql server this would fectch the whole datasets table

    response = datasets
    try:

        return json.dumps(response),200
    except:
        return json.dumps({"error": "No datasets found"}), 400

@app.route("/api/get_columns_tasks/<dataset_id>", methods=["GET"])
@cross_origin()
def get_columns_tasks(dataset_id):
    # do operation for datasets
    # if we connect to mysql server this would fectch the whole datasets table
    # try:
    print("Retrive data for", type(dataset_id), dataset_tasks[0])
    dataset_id = int(dataset_id)
    tasks_ids = dataset_tasks[dataset_id]
    task_dict = {}
    response = {}

    for task_id in tasks_ids:
        # form a new dict that contains the tasks operable on dataset
        task_dict[task_id]= tasks[task_id]

    response["tasks"]= task_dict

    columns = metadata[dataset_id]

    response["columns"] = columns

    print(response)

    return json.dumps(response),200

@app.route("/api/get_algorithms/<task_id>", methods=["GET"])
@cross_origin()
def get_algorithms(task_id):
    # do operation for datasets
    # if we connect to mysql server this would fectch the whole datasets table

    task_id = int(task_id)
    # task and algos
    algorithms_ids = tasks_algos[task_id]

    algorithms_dict = {}

    response = {}

    for algo_id in algorithms_ids:
        # form a new dict that contains the tasks operable on dataset
        algorithms_dict[algo_id]= algorithms[algo_id]

    response["algorithms"]= algorithms_dict

    return json.dumps(response),200
    # except:
    #     return json.dumps({"error": "Error occured when retriving tasks for this dataset"}), 400

# @app.route("/api/dashboard", methods=["GET"])
# @cross_origin()
# def fecth_algorithm_type():
#     dict_result = {}
#     dict_result["tasks"]=["Regression","Classification"]
#     dict_result["datasets"]=["Dataset1","Dataset2"]
#     dict_result["algorithms"]=["Alg1","Alg2"]
#     print("fetched_types",json.dumps({"types":["Regression","Classification"]}))
#     return json.dumps(dict_result),200
#
#
# @app.route("/api/get_metadata", methods=["GET"])
# @cross_origin()
# def get_metadata():
#     dict_result = {}
#     dict_result["columns"]=["SepalLengthCm","SepalWidth","PetalLengthCm","PetalWidthCm"]
#     return json.dumps(dict_result),200

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
