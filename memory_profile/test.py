import numpy as np
import matplotlib.pyplot as plt

def node_voltage_method(filename):
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

    m = sum(is_voltage)
    n = max(second_nodes)

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
    node_voltages = x[:n]

    return node_voltages

def plot_power_over_load_resistance(filename, R_loadname, R_values):
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
        print(f"Power Dissipation at Resistance Value {R_values[j]}: {P_values[j]} W")


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


    plt.show()

if __name__ == '__main__':
    # Example usage with user input:
    filename = input('Enter the circuit file name: ')
    R_loadname = input('Enter the load resistor name: ')
    start_value = float(input('Enter the start value for load resistance: '))
    end_value = float(input('Enter the end value for load resistance: '))
    num_points = int(input('Enter the number of points for load resistance: '))

    R_values = np.linspace(start_value, end_value, num_points)
    plot_power_over_load_resistance(filename, R_loadname, R_values)