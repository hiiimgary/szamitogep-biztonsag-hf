#include <vector>
#include <cstdint>
#include <fstream>
#include "converter/gif.h"
#include "caff/caff.h"
#include "converter/file_to_caff.h"

int main(int argc, const char** argv) {
    /// read arguments
//    if (argc < 3) {
//        printf("insufficient number of arguments, exiting...\n");
//        return -1;
//    }
//    string input_file = argv[1];
//    string output_file = argv[2];

    fileReader("samples/1.caff");

//    int width = 100;
//    int height = 200;
//    std::vector<uint8_t> black(width * height * 4, 0);
//    std::vector<uint8_t> white(width * height * 4, 255);
//
//    auto fileName = "bwgif.gif";
//    int delay = 100;
//    GifWriter g;
//    GifBegin(&g, fileName, width, height, delay);
//    GifWriteFrame(&g, black.data(), width, height, delay);
//    GifWriteFrame(&g, white.data(), width, height, delay);
//    GifEnd(&g);

    return 0;
}