//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_content.h"

const std::vector<std::vector<RGB>> & CiffContent::getPixels() const {
    return pixels;
}

void CiffContent::setPixels(const std::vector<std::vector<RGB>> &pixels) {
    CiffContent::pixels = pixels;
}

RGB::RGB(uint8_t r, uint8_t g, uint8_t b) : R(r), G(g), B(b) {}
