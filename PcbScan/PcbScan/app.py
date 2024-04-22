from flask import Flask, request, jsonify
import cv2
import numpy as np
from PCA_Kmeans import compute_change_map, find_group_of_accepted_classes_DBSCAN, draw_combination_on_transparent_input_image
import global_variables
import time
# Assuming 'main' is the name of the file containing your main function
from main import main
from flask import send_from_directory
from flask_cors import CORS
from flask_cors import cross_origin
import os


app = Flask(__name__)
CORS(app, resources={r"/process_image": {"origins": "*"}})
app.config['UPLOAD_FOLDER'] = 'FlaskOutput/'

@app.route('/process_image', methods=['POST'])
@cross_origin()
def process_image():
    # Get input parameters from the request
    print("image processing started")
    directory_path = 'SaveFiles/'
    output_dir = 'FlaskOutput/'  # Replace with your desired output directory
    reference_image = request.files['reference_image']
    input_image = request.files['input_image']
    file_path_input = os.path.join(directory_path, 'InputImage/Input.jpg')
    file_path_referenced=os.path.join(directory_path,'ReferencedImage/Referenced.jpg')
    input_image.save(file_path_input)
    reference_image.save(file_path_referenced)

    n = int(16)
    window_size = int(5)
    pca_dim_gray = int(3)
    pca_dim_rgb = int(9)
    cut = bool(False)
    lighting_fix = bool(True)
    use_homography = bool(True)
    resize_factor = float(0.2)
    save_extra_stuff = bool(True)

    main(output_dir, file_path_input, file_path_referenced, n, window_size, pca_dim_gray, pca_dim_rgb,
         cut, lighting_fix, use_homography, resize_factor, save_extra_stuff)
    

    return jsonify({'status': 'success', 'message': 'Image processing completed', 'result_image_path': '/get_result_image','input_image_path':'/get_input_image','referenced_image_path':'/get_referenced_image','matching_image_path':'/get_matching_image'})

@app.route('/get_result_image')
def get_result_image():
    return send_from_directory('FlaskOutput', 'ACCEPTED_CLASSES.png')

@app.route('/get_input_image')
def get_input_image():
    return send_from_directory('SaveFiles/InputImage','Input.jpg')

@app.route('/get_referenced_image')
def get_referenced_image():
    return send_from_directory('SaveFiles/ReferencedImage','Referenced.jpg')

@app.route('/get_matching_image')
def get_matching_image():
    return send_from_directory('FlaskOutput','matching.png')

if __name__ == '__main__':
    app.run(debug=True)