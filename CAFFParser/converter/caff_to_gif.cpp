//
// Created by paulg on 2021. 11. 09..
//

#include <cstring>
#include <vector>
#include "../caff/caff.h"
#include "../ciff/ciff_content.h"
#include "gif.h"

void fileWriter(Caff* caff, const char *output_file) {
    /// get all animations
    vector<CaffAnimation> animations = caff->getCaffAnimations();

    /// initialize gif with gif-h and first ciff content
    GifWriter g;
    int first_width = animations[0].getCiff()->getHeader().getWidth();
    int first_height = animations[0].getCiff()->getHeader().getHeight();
    int first_duration = animations[0].getDuration();
    GifBegin(&g, output_file, first_width, first_height, first_duration);

    /// for each ciff, extract width, height, duration and pixel vectors
    for (int i = 0; i < animations.size(); i++) {

        /// atomic data
        int width = animations[i].getCiff()->getHeader().getWidth();
        int height = animations[i].getCiff()->getHeader().getHeight();
        int duration = animations[i].getDuration();

        /// pixel vectors
        vector<RGB> rgb_vector = animations[i].getCiff()->getContent().getPixels();
        vector<uint8_t> red(rgb_vector.size());
        vector<uint8_t> green(rgb_vector.size());
        vector<uint8_t> blue(rgb_vector.size());
        vector<uint8_t> empty_vector(rgb_vector.size());
        for (int j = 0; i < rgb_vector.size(); j++) {
            red[j] = rgb_vector[j].R;
            green[j] = rgb_vector[j].G;
            blue[j] = rgb_vector[j].B;
            empty_vector[j] = 0;
        }

        /// gif frame construction
        GifWriteFrame(&g, red.data(), width, height, duration);
        GifWriteFrame(&g, green.data(), width, height, duration);
        GifWriteFrame(&g, blue.data(), width, height, duration);
        GifWriteFrame(&g, empty_vector.data(), width, height, duration);
    }
    GifEnd(&g);

    /// free up memory space
    delete caff;
}