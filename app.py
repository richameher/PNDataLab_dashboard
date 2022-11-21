from flask import Flask, request
import json
from flask_cors import CORS, cross_origin
from model import ModelPipeline

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Datasets and acceptable Tasks
datasets = {0:"iris", 1:"diabetes"}

metadata = {0: ["SepalLengthCm", "SepalWidthCm","PetalLengthCm","PetalWidthCm"],
1:['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','Age']}

target_cols= {0:'Species',1:"Outcome"}
# tasks table task_id, task_name
tasks = {0:"Regression", 1:"Classification", 2:"Unsupervised"}

# relationshio table for each dataset and task
dataset_tasks = {0:[2], 1:[0,2]}

# tasks and algorithms
# algorithms table alg_id, alg_name
algorithms = {0:"Logistic Regression(L2 Regularization)", 1:"pca (n_component=2)", 2:"Logistic Regression(L1 Regularization)", 3:"Naive Bayes"}

# algorithm and task relationship task_id algorith id
tasks_algos = {0:[0,2], 1:[2,3], 2:[1]}

# graph config options for pca

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

@app.route("/api/make_evaluation_graph", methods=["POST"])
@cross_origin()
def make_evaluation_graph():
    data = json.loads(request.data)['data']

    col_list = []
    for k,v in data['columns_selected'].items():
        if v == True:
            col_list.append(k)

    response = {}
    algorithm_name = algorithms[int(data['algorithm_id'])]
    dataset_name = datasets[int(data['dataset_id'])]
    config = {}

    if 'pca' in algorithm_name:
        config = {'n_components':2}

    model = ModelPipeline(algorithm_name,'data/'+dataset_name+'.csv',col_list, config, target_cols[int(data['dataset_id'])])
    model.process_data()
    model.run_algorithm()
    model.process_result_clustering()





    colors = ['pink','blue','green','red','yellow']

    response_datasets =[]
    color_ptr = 0
    for k,v in model.labeled_dataset.items():
        dict = {}
        dict['label'] = str(k)
        dict['data'] = v
        dict['backgroundColor'] =colors[color_ptr]
        color_ptr+= 1
        response_datasets.append(dict)


    response['data_results']={
      'datasets': response_datasets
    }

    if 'Logistic' in algorithm_name:
        response['accuracy']={
          'accuracy': model.mean_accuracy
        }




    return json.dumps(response), 200

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
