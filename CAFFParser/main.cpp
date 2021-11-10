//
// Created by paulg on 2021. 11. 07..
//

#include <cstdio>
#include "caff/caff.h"
#include "converter/file_to_caff.hpp"
#include "converter/caff_to_gif.hpp"

int main(int argc, const char** argv) {
    /// read arguments
    if (argc < 3) {
        printf("insufficient number of arguments, exiting...\n");
        return -1;
    }
    const char* input_file = argv[1];
    const char* output_file = argv[2];

    /// convert caff to gif
    try {
        Caff* caff = fileReader(input_file);
        fileWriter(caff, output_file);
    }
    catch (const std::exception& e) {
        printf("%s\n", &e);
        return -1;
    }
    return 0;
}
