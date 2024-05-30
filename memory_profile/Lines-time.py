import timeit

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

# Measure time taken by fib_dc
dc_time = timeit.timeit('fib_dc(20)', globals=globals(), setup='from __main__ import fib_dc', number=10)

# Measure time taken by fib_dp
dp_time = timeit.timeit('fib_dp(100)', globals=globals(), setup='from __main__ import fib_dp', number=10)

# Print results
print(f"Time taken by fib_dc: {dc_time} seconds")
print(f"Time taken by fib_dp: {dp_time} seconds")