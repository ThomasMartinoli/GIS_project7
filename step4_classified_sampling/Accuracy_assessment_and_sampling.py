from qgis.core import QgsProcessing
from qgis.core import QgsProcessingAlgorithm
from qgis.core import QgsProcessingMultiStepFeedback
from qgis.core import QgsProcessingParameterFileDestination
from qgis.core import QgsProcessingParameterFile
from qgis.core import QgsProcessingParameterVectorLayer
from qgis.core import QgsProcessingParameterRasterLayer
from qgis.core import QgsProcessingParameterField
from qgis.core import QgsProcessingParameterString
from qgis.core import QgsVectorLayer
from qgis.core import QgsProcessingParameterFeatureSink
from qgis.core import QgsProject
from qgis.core import QgsFeatureSink
import processing
import numpy as np
import random
import string
import os
import pandas as pd





class Accuracy_assessment_and_sampling(QgsProcessingAlgorithm):        
    def initAlgorithm(self, config=None):
        self.addParameter(QgsProcessingParameterVectorLayer('vectorwithclassificationandreference', 'Vector with reference data', types=[QgsProcessing.TypeVector], defaultValue=None))
        #self.addParameter(QgsProcessingParameterVectorLayer('vectorwithclassificationandreference', 'Vector with classification', types=[QgsProcessing.TypeVector], defaultValue='C:/Users/Gorica/Documents/Teaching_2020_2021/Lab/Sampling points/stratified_random_sampling1_classified.gpkg'))
        self.addParameter(QgsProcessingParameterField('reference', 'Reference data column', type=QgsProcessingParameterField.Numeric, parentLayerParameterName='vectorwithclassificationandreference', allowMultiple=False, defaultValue=None))
        self.addParameter(QgsProcessingParameterString('Newfieldname', 'Name of new field for raster values', multiLine=False, defaultValue='Thematic_class'))
        self.addParameter(QgsProcessingParameterRasterLayer('raster', 'Raster to be sampled', defaultValue=None))
        self.addParameter(QgsProcessingParameterFileDestination('Outputfolder', 'Error matrix output path', fileFilter='CSV Files (*.csv)', defaultValue=None))
        self.addParameter(QgsProcessingParameterFeatureSink('Sampled', 'Sampled', type=QgsProcessing.TypeVectorAnyGeometry, createByDefault=True))#, defaultValue=None))
        #self.addParameter(QgsProcessingParameterVectorDestination('Sampled', 'Sampled', type=QgsProcessing.TypeVectorPoint, defaultValue=None, optional=True))
        
    def processAlgorithm(self, parameters, context, model_feedback):
        # Use a multi-step feedback, so that individual child algorithm progress reports are adjusted for the
        # overall progress through the model
        feedback = QgsProcessingMultiStepFeedback(1, model_feedback)
        results = {}
        outputs = {}

        #reference=parameters['reference']
        #classification=parameters['Newfieldname'] 
        #output_folder=parameters['Outputfolder']
        
        # Sample raster values
        alg_params = {
            'COLUMN_PREFIX': parameters['Newfieldname'],
            'INPUT': parameters['vectorwithclassificationandreference'],
            'RASTERCOPY': parameters['raster'],
            'OUTPUT': parameters['Sampled']
        }

        SampleRasterValues= processing.run('qgis:rastersampling', alg_params, context=context, feedback=feedback, is_child_algorithm=True)
       

        vlayer = QgsVectorLayer(SampleRasterValues['OUTPUT'])

        
        idx_1 = vlayer.fields().indexFromName(parameters['reference'])
        idx_2 = vlayer.fields().indexFromName(parameters['Newfieldname'])
        

        list_class = []
        list_ref = []
        
        features =  vlayer.getFeatures()
        
        for ft in features:
            if ft.attributes()[idx_2]!=None and ft.attributes()[idx_1]!=None:
                list_class.append(ft.attributes()[idx_2])
                list_ref.append(ft.attributes()[idx_1])

        feedback.pushInfo(str(idx_2))
        error_matrix1=pd.crosstab(pd.Series(list_class, name=parameters['Newfieldname']),pd.Series(list_ref, name=parameters['reference']), dropna=False)

        cls_cat=error_matrix1.index.values
        
        #extract all columns values (classes of existing dataset)
        ref_cat=error_matrix1.columns.values
        #make union of index and column values
        cats=(list(set(ref_cat) | set(cls_cat)))
        #reindex error matrix so that it has missing columns and fill the emtpy cells with 0.00000001
        error_matrix=error_matrix1.reindex(index=cats, columns=cats, fill_value=0.00000001)
        error_matrix.index.name=error_matrix.index.name+"/"+error_matrix.columns.name
        
        # OUTPUT    

            
        diag_elem=np.diagonal(np.matrix(error_matrix))
        UA=(diag_elem/error_matrix.sum(axis=1))*(diag_elem>0.01)
        PA=diag_elem/error_matrix.sum(axis=0)*(diag_elem>0.01)
        OA=sum(diag_elem)/error_matrix.sum(axis=1).sum()
        error_matrix['UA']=UA.round(2)
        error_matrix['PA']=PA.round(2)
        error_matrix['OA']=np.nan
        error_matrix.loc[error_matrix.index[0],'OA']=OA

        error_matrix.to_csv(parameters['Outputfolder'])
        feedback.pushConsoleInfo('Error matrix saved in '+parameters['Outputfolder'])
        return results

    def name(self):
        return 'Accuracy_assessment_and_sampling'

    def displayName(self):
        return 'Accuracy assessment and sampling'

    def group(self):
        return 'raster'

    def groupId(self):
        return ''
    def shortHelpString(self):
        return """<html><body><h2>Algorithm description</h2>
<p>This algorithm takes sample points with reference classes and sample raster in the same location of sample points. Then it estimates error matrix and accuracy indexes by cross tabulating field with reference classes and field with classification classes.</p>
<h2>Input parameters</h2>
<h3>Vector with reference data</h3>
<p>Vector of sampling points which are already classified ( i.e. reference point data)</p>
<h3>Raster to be sampled</h3>
<p>Raster is the thematic map for which accuracy is being estimated. This raster will be sampled in the location of sampling points.</p>
<h3>Reference data column</h3>
<p>Name of the column in which sampled raster values will be stored </p>
<h2>Outputs</h2>
<h3>Error matrix output path</h3>
<p>Mandatory!!!Path and name of the output file with error matrix and accuracy indexes. Accuracy indexes estimated are Overall accuracy, User's accuracy and Producer's accuracy.</p>
<h3>Sampled</h3>
<p>Mandatory!!!Path and name of the output vector file that contains all the data as "Vector with reference data" plus the new column with values sampled from raster </p>
<br><p align="right">Algorithm author: Gorica Bratic</p><p align="right">Algorithm version: 1.0</p></body></html>"""

    def createInstance(self):
        return Accuracy_assessment_and_sampling()
