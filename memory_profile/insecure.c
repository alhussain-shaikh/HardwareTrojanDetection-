#include <stdio.h>
#include <stdlib.h>

void insecureFunction(const char *input) {
    printf(input);  // Format string vulnerability here
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <input>\n", argv[0]);
        return 1;
    }

    char buffer[50];
    strcpy(buffer, argv[1]);  // Insecure function

    printf("Input: ");
    printf(buffer);  // Format string vulnerability here

    return 0;
}
