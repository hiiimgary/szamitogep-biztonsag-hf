//
// Created by paulg on 2021. 11. 07..
//

#include <stdio.h>
#include "caff/caff.h"
#include "converter/file_to_caff.h"
#include "converter/caff_to_gif.h"

int main(int argc, const char** argv) {
    /// read arguments
//    if (argc < 3) {
//        printf("insufficient number of arguments, exiting...\n");
//        return -1;
//    }
//    string input_file = argv[1];
//    string output_file = argv[2];

    try {
        Caff* caff = fileReader("../samples/1.caff");
        fileWriter(caff, "best_gif_ever.gif");
    }
    catch (const std::exception& e) {
        printf("%s\n", &e);
        return -1;
    }
    return 0;
}
