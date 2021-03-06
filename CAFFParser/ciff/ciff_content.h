//
// Created by Tamas on 2021. 11. 09..
//

#ifndef CAFFPARSER_CIFF_CONTENT_H
#define CAFFPARSER_CIFF_CONTENT_H

#include <cstdint>
#include <vector>

struct RGB {
    uint8_t R{};
    uint8_t G{};
    uint8_t B{};

    RGB(uint8_t r, uint8_t g, uint8_t b);
};

class CiffContent {
private:
    std::vector<std::vector<RGB>> pixels;

public:
    const std::vector<std::vector<RGB>> &getPixels() const;

    void setPixels(const std::vector<std::vector<RGB>> &pixels);

};

#endif //CAFFPARSER_CIFF_CONTENT_H
