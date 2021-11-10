//
// Created by paulg on 2021. 11. 09..
//

#include <vector>
#include <cstdint>
#include "../caff/caff.h"
#include "../ciff/ciff_content.h"
#include "gif.h"

void fileWriter(Caff* caff, const char *output_file) {
    /// get all animations
    vector<CaffAnimation> animations = caff->getCaffAnimations();

    /// initialize gif with gif-h and first ciff content
    GifWriter g;
    uint64_t first_width = animations[0].getCiff()->getHeader().getWidth();
    uint64_t first_height = animations[0].getCiff()->getHeader().getHeight();
    uint64_t first_duration = animations[0].getDuration();
    GifBegin(&g, output_file, first_width, first_height, first_duration);

    /// for each ciff, extract width, height, duration and pixel vectors
    for (auto & animation : animations) {

        /// atomic data
        uint64_t width = animation.getCiff()->getHeader().getWidth();
        uint64_t height = animation.getCiff()->getHeader().getHeight();
        uint64_t duration = animation.getDuration();

        /// construct pixel vector
        vector<vector<RGB>> rgb_vector = animation.getCiff()->getContent().getPixels();
        vector<uint8_t> pixel(width * height * 4);
        for (int h = 0; h < height; h++) {
            for (int w = 0; w < width; w++) {
                pixel.push_back((uint8_t)rgb_vector[h][w].R);
                pixel.push_back((uint8_t)rgb_vector[h][w].G);
                pixel.push_back((uint8_t)rgb_vector[h][w].B);
                pixel.push_back((uint8_t)77);
            }
        }

        /// construct gif frame
        GifWriteFrame(&g, pixel.data(), width, height, duration);
    }
    GifEnd(&g);

    /// free up memory space
    delete caff;
}
