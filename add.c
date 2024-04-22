#include <stdio.h>

int main() {
    // Declare variables
    int num1, num2, sum;

    // Prompt user for input
    printf("Enter first number: ");
    scanf("%d", &num1);

    printf("Enter second number: ");
    scanf("%d", &num2);

    // Calculate the sum
    sum = num1 + num2;

    // Display the result
    printf("Sum: %d\n", sum);

    return 0;
}
