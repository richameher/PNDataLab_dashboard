import pandas as pd
from sklearn.decomposition import PCA

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

def linear_regression():
    pass

ERR = -1

class ModelPipeline:
    def __init__(self, algorithm, dataset_path, col_list, options):
        self.algorithm= algorithm
        self.dataset_path = dataset_path
        self.dataset = None
        self.col_list = col_list
        self.result = {}
        self.config = options

    def process_data(self):
        dataFrame = pd.read_csv(self.dataset_path)

        if self.col_list is not None:
            try:
                self.dataset= dataFrame[self.col_list]
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
            self.result = pca(self.dataset,self.config['n_components'])

        pass
