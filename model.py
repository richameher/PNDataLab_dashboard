import pandas as pd
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import AdaBoostClassifier
from random import uniform


def pca(dataset,no_components=0.95):
    X = dataset
    pca_2 = PCA(n_components = no_components )
    pca_2.fit(X)
    X_2 = pca_2.transform(X)

    # process output
    result = []

    for row in X_2:
        temp_dict = {}
        temp_dict['x'] = row[0]
        temp_dict['y'] = row[1]
        result.append(temp_dict)

    return result

def knn():
    pass

def logistic_regression_l2(dataset, target_data):
    X, y = dataset, target_data
    clf = LogisticRegression(random_state=0).fit(X, y)
    # clf = AdaBoostClassifier(n_estimators=100, random_state=0).fit(X, y)
    predicted_probs = clf.predict_proba(X)
    result = []
    idx = 0

    for prob_val in predicted_probs:
        temp_dict = {}

        temp_dict['x'] = prob_val[1]

        if prob_val[0] > prob_val[1]:
            temp_dict['y'] = int(0)+uniform(-0.1, 0.1)
        else:
            temp_dict['y'] = int(1)+uniform(-0.1, 0.1)

        result.append(temp_dict)
        idx+=1


    return result, clf.score(X, y)

def logistic_regression_l1(dataset, target_data):
    X, y = dataset, target_data
    clf = LogisticRegression(random_state=0,solver='liblinear',penalty='l1').fit(X, y)
    # clf = AdaBoostClassifier(n_estimators=100, random_state=0).fit(X, y)
    predicted_probs = clf.predict_proba(X)
    result = []
    idx = 0

    for prob_val in predicted_probs:
        temp_dict = {}

        temp_dict['x'] = prob_val[1]

        if prob_val[0] > prob_val[1]:
            temp_dict['y'] = int(0)+uniform(-0.1, 0.1)
        else:
            temp_dict['y'] = int(1)+uniform(-0.1, 0.1)

        result.append(temp_dict)
        idx+=1


    return result, clf.score(X, y)

ERR = -1

class ModelPipeline:
    def __init__(self, algorithm, dataset_path, col_list, options, target_column=""):
        self.algorithm= algorithm
        self.dataset_path = dataset_path
        self.target = target_column
        self.no_of_targets = 0
        self.dataset = None
        self.target_dataset = None
        self.col_list = col_list
        self.algo_result = {}
        self.config = options
        self.labeled_dataset = {}
        self.mean_accuracy = 0

    def process_data(self):
        dataFrame = pd.read_csv(self.dataset_path)

        if self.col_list is not None:
            try:
                self.dataset= dataFrame[self.col_list]
                try:
                    self.target_dataset = dataFrame[self.target].to_numpy()
                except:
                    print("No target column present")
                return
            except:
                print("Error: col list provided is not correct")
                return ERR
        else:
            self.dataset = dataFrame
        return


    def run_algorithm(self):
        # call class pca and pass dataFrameRefined

        if 'pca' in self.algorithm:

            self.algo_result = pca(self.dataset,self.config['n_components'])

        elif 'L2' in self.algorithm:

            self.algo_result, self.mean_accuracy = logistic_regression_l2(self.dataset,self.target_dataset)

        elif 'L1' in self.algorithm:

            self.algo_result, self.mean_accuracy = logistic_regression_l1(self.dataset,self.target_dataset)



        pass

    def process_result_clustering(self):

        # process dataset by adding target label
        self.no_of_targets = set(self.target_dataset)

        for i in range(0, len(self.algo_result)):
            if self.target_dataset[i] not in self.labeled_dataset:
                self.labeled_dataset[self.target_dataset[i]] = []
            self.labeled_dataset[self.target_dataset[i]].append(self.algo_result[i])


        return
