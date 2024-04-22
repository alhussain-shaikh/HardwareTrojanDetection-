import cProfile
import random 
import math 
from line_profiler import LineProfiler
from memory_profiler import profile
import timeit
# import matplotlib.pyplot as plt
import yappi


def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m
    L = [0] * (n1)
    R = [0] * (n2)
    for i in range(0, n1):
        L[i] = arr[l + i]
 
    for j in range(0, n2):
        R[j] = arr[m + 1 + j]
    i = 0     # Initial index of first subarray
    j = 0     # Initial index of second subarray
    k = l     # Initial index of merged subarray
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def mergeSort(arr, l, r):

    if l < r:
        m = l+(r-l)//2
        mergeSort(arr, l, m)
        mergeSort(arr, m+1, r)
        merge(arr, l, m, r)

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def log_log_time_complexity(n):
    if n <= 1:
        return 0

    result = 0
    while n > 1:
        n = math.log(n)
        result += 1
    return result

@profile(precision=6)
def fibonacci_recursive(n):
    if n <= 1:
        return n
    else:
        return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)


@profile(precision=6)
def fibonacci_memoization(n, memo={}):
    if n <= 1:
        return n

    if n not in memo:
        memo[n] = fibonacci_memoization(n - 1, memo) + fibonacci_memoization(n - 2, memo)

    return memo[n]

# Divide and Conquer (naive recursion)
def fib_dc(n):
    if n <= 1:
        return n
    return fib_dc(n - 1) + fib_dc(n - 2)

# Dynamic Programming with memoization
cache = {}
def fib_dp(n):
    if n <= 1:
        return n
    if n not in cache:
        cache[n] = fib_dp(n - 1) + fib_dp(n - 2)
    return cache[n]

def sum_arrays():
    arr1 = [3] * (5 ** 10)
    arr2 = [4] * (3 ** 11)
    return arr1 + arr2


if __name__ == '__main__':

    print("\n\n\t\t\t\t\t*******WELCOME TO CODE ANALYSER*******\n\n")
    while(True):
        print("1. Time Analysis using cProfile")
        print("2. Linear Time Analysis using LineProfiler ")
        print("3. Memory Analysis using Memory Profiler")
        print("4. Total Elapsed Time Analysis using Timeit")
        print("5. In-Depth Analysis using Yappi")
        print("6. Exit")
        choice=int(input("\n\nEnter your choice of anlaysis : "))
        

        if(choice==1):

            print("Time Analysis using cProfile \n\n")
            a = int(input("Enter Range of integers : "))
            n = int(input("Range of integers : "))
            random_list = [random.randint(1, a) for _ in range(n)]

            cProfile.run("mergeSort(random_list,0,n-1)")
            cProfile.run("bubble_sort(random_list)")
            cProfile.run("log_log_time_complexity(n)")
        
        elif(choice==2):
            print("Linear Time Analysis using LineProfiler \n\n")

            a = int(input("Enter Range of integers : "))
            n = int(input("Range of integers : "))
            random_list = [random.randint(1, a) for _ in range(n)]

            lp = LineProfiler()
            lp1=LineProfiler()
            lp.add_function(bubble_sort)
            lp.run('bubble_sort(random_list)')
            lp.print_stats()
            lp1.add_function(mergeSort)
            lp1.run('mergeSort(random_list,0,n-1)')
            lp1.print_stats()

        elif(choice==3):
            print("Memory Analysis using Memory Profiler \n\n")
            t=int(input("enter which fibonacci number do you want: "))
            result = fibonacci_memoization(t)
            print("*****Fibonacci Using Dynamic Programming :******\n")
            print(f"The {t}-th Fibonacci number is: {result}\n\n")
            result_rec = fibonacci_recursive(t)
            print("*****Fibonacci Using Recursion:*******\n")
            print(f"The {t}-th Fibonacci number is: {result_rec}\n\n")

        
        elif(choice==4):
            print("Total Elapsed Time Analysis using Timeit \n\n")
            dc_time = timeit.timeit('fib_dc(20)', globals=globals(), setup='from __main__ import fib_dc', number=10)
            dp_time = timeit.timeit('fib_dp(100)', globals=globals(), setup='from __main__ import fib_dp', number=10)
            print(f"Time taken by Fibonacci Using Recursion: {dc_time} seconds")
            print(f"Time taken by Fibonacci Using Dyanmic Programming: {dp_time} seconds")

            labels = ['fib_dc', 'fib_dp']
            times = [dc_time, dp_time]

            # plt.bar(labels, times, color=['blue', 'green'])
            # plt.xlabel('Algorithm')
            # plt.ylabel('Time (seconds)')
            # plt.title('Comparison of Execution Time')
            # plt.show()

        elif(choice==5):
            print("In-Depth Analysis using Yappi \n\n")
            with yappi.run(builtins=True):
                final_arr = sum_arrays()
            print("\n--------- Function Stats -----------")
            yappi.get_func_stats().print_all()
            print("\n--------- Thread Stats -----------")
            yappi.get_thread_stats().print_all()
            print("\nYappi Backend Types: ",yappi.BACKEND_TYPES)
            print("Yappi Clock Types: ", yappi.CLOCK_TYPES)
        
        elif(choice==6):
            print("Exit \n\n")
            exit()

        else:
            print("INVALID CHOICE!!")
            print("Please enter between 1 to 5")

