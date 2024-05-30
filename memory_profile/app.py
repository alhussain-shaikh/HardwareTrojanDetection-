import subprocess
import os

def run_flawfinder_analysis(file_name):
    # Set the path to the directory containing the C source code (current working directory)
    source_directory = os.getcwd()

    # Specify the command to run flawfinder for C code analysis on the given file
    command = [
        'flawfinder',
        '--minlevel', '1',  # Minimum risk level (you can adjust this)
        '--quiet',  # Suppress extra information
        file_name
    ]

    # Run the command
    try:
        subprocess.run(command, check=True)
        print("Static analysis completed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Static analysis failed. Error: {e}")

if __name__ == "__main__":
    # Prompt the user to enter the C file name
    c_file_name = input("Enter the C file name (with .c extension): ")

    # Run flawfinder analysis on the specified C file
    run_flawfinder_analysis(c_file_name)