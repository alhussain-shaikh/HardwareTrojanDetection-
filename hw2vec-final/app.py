from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pathlib import Path
from hw2vec.hw2graph import *
import subprocess
from hw2vec.config import Config
from torch_geometric.data import DataLoader
import logging
import base64
import cProfile
import io
# from memory_profiler import profile as mem_profile
import pstats

app = Flask(__name__)
# CORS(app,origins='http://localhost:3000/rtl') 
logging.basicConfig(level=logging.DEBUG)
CORS(app, origins='http://localhost:3000', allow_headers=["Content-Type", "Authorization"], supports_credentials=True, expose_headers="Authorization", methods=["GET", "POST", "PUT", "DELETE"])

@app.route('/use_case_1', methods=['POST'])
def use_case_1():
    cfg = Config(sys.argv[1:])  # Assuming config_args is passed as a query parameter

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the file to a temporary location (you may want to improve this)
    directory_path = 'temp_verilog_files/'
    file_path = os.path.join(directory_path, 'topModule.v')
    file.save(file_path)
    hw_design_dir_path = Path("temp_verilog_files/")
    pretrained_model_weight_path = 'examples/model.pth'
    pretrained_model_cfg_path = 'examples/model.cfg'
    cfg.graph_type = "DFG"

    hw2graph = HW2GRAPH(cfg)
    
    hw_design_path = hw2graph.preprocess(hw_design_dir_path)
    print(len(str(hw_design_path).split("/")))
    hardware_nxgraph = hw2graph.process(hw_design_path)

    data_proc = DataProcessor(cfg)
    data_proc.process(hardware_nxgraph)
    vis_loader = DataLoader(data_proc.get_graphs(), batch_size=1)
    
    model = GRAPH2VEC(cfg)
    model.load_model(pretrained_model_cfg_path, pretrained_model_weight_path)
    model.to(cfg.device)
    graph_data = next(iter(vis_loader)).to(cfg.device)
    graph_embed, _ = model.embed_graph(graph_data.x, graph_data.edge_index, graph_data.batch)

    trojan_prediction = model.mlp(graph_embed)
    print(trojan_prediction)
    logging.info(f'Trojan Prediction: {trojan_prediction}')
    
    y0 = trojan_prediction[0, 0].item()
    y1 = trojan_prediction[0, 1].item()
    
    if y0 < y1:
        result = f"Trojan Detected in RTL CODE \n\n {trojan_prediction}"
    else:
        result = f"Trojan Not Detected in RTL CODE \n\n {trojan_prediction}"

    return jsonify({'result': result})


def run_flawfinder_analysis(file_path):
    command = ['flawfinder', '--minlevel', '1', '--quiet', file_path]
    try:
        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # Decode the byte output to string
        stdout_str = result.stdout.decode('utf-8')
        stderr_str = result.stderr.decode('utf-8')

        if stdout_str:
            return stdout_str
        elif stderr_str:
            return stderr_str
        else:
            return "Static analysis completed successfully."
    except subprocess.CalledProcessError as e:
        return f"Static analysis failed. Error: {e}"

@app.route('/analyze-c-code', methods=['POST'])
def analyze_c_code():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_path = os.path.join(os.getcwd(), file.filename)
        file.save(file_path)
        result = run_flawfinder_analysis(file_path)
        os.remove(file_path)  # Remove the file after analysis
        return jsonify({"result": result})

# def run_flawfinder_analysis(file_name):
#     source_directory = os.getcwd()

#     command = [
#         'flawfinder',
#         '--minlevel', '1',
#         '--quiet',
#         file_name
#     ]

#     try:
#         result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
#         filtered_output = filter_flawfinder_output(result.stdout.decode('utf-8'))
#         print(filtered_output)
#         print("Static analysis completed successfully.")
#     except subprocess.CalledProcessError as e:
#         print(f"Static analysis failed. Error: {e}")

# def filter_flawfinder_output(output):
#     lines = output.split('\n')

#     filtered_lines = [
#         line
#         for line in lines
#         if 'Flawfinder version' not in line
#         and 'Make sure it\'s a false positive!' not in line
#         and 'You can use the option --neverignore to show these.' not in line
#         and 'You can inhibit a report' not in line
#         and not line.startswith('// flawfinder: ignore')
#     ]

#     filtered_output = '\n'.join(filtered_lines)

#     if "No hits found." in filtered_output:
#         filtered_output = '\n'.join(filtered_lines[:-4])
#         filtered_output = filtered_output + "\n" + "The code does not contain any flaw or security threads!"

#     return filtered_output

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     if request.method == 'POST':
#         c_file = request.files['c_file']
#         c_file.save(c_file.filename)
#         result = run_flawfinder_analysis(c_file.filename)
#         with open('analysis_result.txt', 'w') as file:
#             file.write(result)
#         return send_file('analysis_result.txt', as_attachment=True)
    
def analyze_python_code(code):
    pr = cProfile.Profile()
    pr.enable()
    
    try:
        exec(code)
    except Exception as e:
        return str(e)

    pr.disable()
    s = io.StringIO()
    ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
    ps.print_stats()

    return s.getvalue()

@app.route('/analyze-python-code', methods=['POST'])
def analyze_python_code_route():
    print("making post request to analyze python code")
    data = request.get_json()
    code = data.get('code', '')

    result = analyze_python_code(code)

    return jsonify({'result': result})
    
# def analyze_python_code(code):
#     pr = cProfile.Profile()
#     pr.enable()

#     mem_result = mem_profile(exec)(code)

#     pr.disable()
#     s = io.StringIO()
#     ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
#     ps.print_stats()

#     lp = LineProfiler()
#     lp_wrapper = lp(exec)
#     lp_wrapper(code)
#     lp_result = lp.display()

#     return {'cprofiler_result': s.getvalue(), 'mem_result': mem_result, 'lp_result': lp_result}

# @app.route('/analyze-python-code', methods=['POST'])
# def analyze_python_code_route():
#     data = request.get_json()
#     code = data.get('code', '')

#     result = analyze_python_code(code)

#     return jsonify(result)



def perform_circuit_analysis(filename, R_loadname, R_values):
    with open(filename, 'r') as file:
        lines = file.readlines()

    element_names, first_nodes, second_nodes, values = [], [], [], []

    for line in lines:
        parts = line.split()
        element_names.append(parts[0])
        first_nodes.append(int(parts[1]))
        second_nodes.append(int(parts[2]))
        values.append(float(parts[3]))

    is_voltage = [name.startswith('V') for name in element_names]
    is_current = [name.startswith('I') for name in element_names]
    is_resistance = [name.startswith('R') for name in element_names]

    assert any(is_voltage) or any(is_current) or any(is_resistance), f'Unidentified element names exist at {filename}'
    assert all(value >= 0 for value in values if is_resistance), f'Negative resistance values exist at {filename}'

    is_load = element_names.index(R_loadname)
    node1 = first_nodes[is_load]
    node2 = second_nodes[is_load]

    m = sum(is_voltage)
    n = max(second_nodes)
    R_len = len(R_values)
    P_values = np.zeros(R_len)

    for j in range(R_len):
        values[is_load] = R_values[j]

        G = np.zeros((n, n))

        for node in range(1, n + 1):
            non_zero_resistances = [value for value, first, second, is_res in zip(values, first_nodes, second_nodes, is_resistance) if (first == node or second == node) and is_res and value != 0]
            if non_zero_resistances:
                G[node - 1, node - 1] = sum(1 / value for value in non_zero_resistances)

        for r_ind in [i for i, is_r in enumerate(is_resistance) if is_r]:
            R_first_nodes = first_nodes[r_ind]
            R_second_nodes = second_nodes[r_ind]
            if R_first_nodes > 0 and R_second_nodes > 0 and values[r_ind] != 0:
                G[R_first_nodes - 1, R_second_nodes - 1] -= 1 / values[r_ind]
                G[R_second_nodes - 1, R_first_nodes - 1] -= 1 / values[r_ind]

        B = np.zeros((n, m))
        voltage_no = 1

        for v_ind in [i for i, is_v in enumerate(is_voltage) if is_v]:
            if first_nodes[v_ind] > 0:
                B[first_nodes[v_ind] - 1, voltage_no - 1] = -1
            if second_nodes[v_ind] > 0:
                B[second_nodes[v_ind] - 1, voltage_no - 1] = 1
            voltage_no += 1

        C = B.T
        D = np.zeros((m, m))
        A = np.block([[G, B], [C, D]])

        i = np.zeros(n)
        for node in range(1, n + 1):
            i[node - 1] = sum(values[ind] for ind, second, is_c in zip(range(len(values)), second_nodes, is_current) if second == node and is_c) - sum(values[ind] for ind, first, is_c in zip(range(len(values)), first_nodes, is_current) if first == node and is_c)

        e = np.array([values[ind] for ind, is_v in enumerate(is_voltage) if is_v])
        z = np.concatenate((i, e))

        x = np.linalg.solve(A, z)
        if node1 == 0:
            V1 = 0
        else:
            V1 = x[node1 - 1]
        if node2 == 0:
            V2 = 0
        else:
            V2 = x[node2 - 1]

        P_values[j] = (V2 - V1) ** 2 / values[is_load]

    # Plot and save the power vs load resistance graph
    plt.plot(R_values, P_values)
    plt.title('Power Dissipation vs Load Resistance', color='b', fontsize=14)
    plt.xlabel('${R_{Load}} (\Omega)$: Load Resistance')
    plt.ylabel('(W): Power Dissipated')

    imax = np.argmax(P_values)
    P_peak = P_values[imax]
    R_peak = R_values[imax]
    plt.text(R_peak, P_peak, f'${{P_{{Max}}}} = {P_peak:.6f}$ W', verticalalignment='bottom', fontsize=8)
    plt.text(R_peak, P_peak, f'${{R_{{Load}}}} = {R_peak:.6f}$ $\\Omega$', verticalalignment='top', fontsize=8)
    plt.plot(R_peak, P_peak, 'r*')

    # Save the plot to a BytesIO object
    img_buf = io.BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_str = base64.b64encode(img_buf.read()).decode('utf-8')

    # Close the plot
    plt.close()

    return img_str

@app.route('/analyze_circuit', methods=['POST'])
def analyze_circuit():
    data = request.get_json()

    # Extract data from the request
    filename = data['filename']
    R_loadname = data['R_loadname']
    start_value = float(data['start_value'])
    end_value = float(data['end_value'])
    num_points = int(data['num_points'])

    # Convert R_values to a NumPy array
    R_values = np.linspace(start_value, end_value, num_points)

    # Call the existing function to perform the circuit analysis and power plot
    result = perform_circuit_analysis(filename, R_loadname, R_values)

    return jsonify({'plot': result})


if __name__ == '__main__':
    app.run(debug=True)