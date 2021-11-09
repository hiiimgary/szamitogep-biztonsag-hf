#include <vector>
#include <cstdint>
#include "converter/gif.h"

int main(int argc, const char** argv)
{
    int width = 100;
    int height = 200;
    std::vector<uint8_t> black(width * height * 4, 0);
    std::vector<uint8_t> white(width * height * 4, 255);

    auto fileName = "bwgif.gif";
    int delay = 100;
    GifWriter g;
    GifBegin(&g, fileName, width, height, delay);
    GifWriteFrame(&g, black.data(), width, height, delay);
    GifWriteFrame(&g, white.data(), width, height, delay);
    GifEnd(&g);

    return 0;
}