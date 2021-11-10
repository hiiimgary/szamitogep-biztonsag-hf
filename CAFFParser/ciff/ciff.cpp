//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include "ciff_content.h"
#include "ciff.h"
#include <string.h>

#include "../data_manipulation/helper.h"

CiffHeader Ciff::getHeader() {
    return header;
}

CiffContent Ciff::getContent() {
    return content;
}

void Ciff::saveCiffPartsToVariables(std::vector<char> animation) {

    // Setting magic
    printf("------CIFF HEADER---------\n");
    char* magic = vectorToString(trim(animation, 0, 3));
    printf("Magic: %s\n", magic);

    if (strcmp(magic, "CIFF") != 0) {
        throw "Not valid Ciff Format";
    }
    delete[] magic;

    // Setting header size
    uint64_t header_size = toInt(trim(animation, 4, 11));
    header.setHeaderSize(header_size);

    // Setting content size
    header.setContentSize(toInt(trim(animation, 12, 19)));

    // Setting width and height
    uint64_t header_width = toInt(trim(animation, 20, 27));
    uint64_t header_height = toInt(trim(animation, 20, 27));
    header.setWidth(header_width);
    header.setHeight(header_height);

    uint64_t index = parseCaption(animation, 36);

    parseTags(animation, index + 1, header_size);

    parseContent(animation, header_size, animation.size(), header_width);


}

uint64_t Ciff::parseCaption(std::vector<char> in, uint64_t from) {
    int size = in.size();
    char* tmp = new char[size];

    int i = 0;
    for (i; i < size; i++) {
        tmp[i] = in[i + from];
        if (in[i + from] == '\n') {
            break;
        }
    }

    tmp[i + 1] = '\0';
    header.setCaption(tmp);
    printf("Caption: %s", tmp);

    delete[] tmp;

    return i;
}

void Ciff::parseTags(std::vector<char> in, uint64_t from, uint64_t to) {
    std::vector<std::string> tags;
    char* tmp = new char[to - from];
    uint64_t index = 0;

    for (uint64_t i = from; i < to; i++, index++) {
        tmp[index] = in[i];
        if (in[i] == '\0') {
            tags.emplace_back(tmp);
            index = -1;
        }
    }

    delete[] tmp;

    header.setTags(tags);
}

<<<<<<< HEAD
void Ciff::parseContent(std::vector<char> in, uint64_t from, uint64_t to, uint64_t width) {
    uint64_t row = 0;
    uint64_t col = 0;

    std::vector<RGB> pixel_row;
    std::vector <std::vector<RGB>> rows;

    for (uint64_t i = from; i < to; i += 3, col++) {
        if (width <= col) {
            row++;
            col = 0;
            rows.push_back(pixel_row);
            pixel_row.clear();
        }

        RGB rgb(in[i], in[i+1], in[i+2]);

        pixel_row.push_back(rgb);
    }

    rows.push_back(pixel_row);
=======
void Ciff::parseContent(std::vector<char> in, uint64_t from, uint64_t to, uint64_t width, uint64_t height) {
    uint64_t row = 0;
    uint64_t col = 0;

    std::vector<RGB> current_row;
    std::vector <std::vector<RGB>> rows;

    for (uint64_t i = from; i < to; i += 3, col++) {
        if (col == width) {
            row++;
            col = 0;
            rows.push_back(current_row);
            current_row.clear();
        }

        RGB rgb;
        rgb.R = in[i];
        rgb.G = in[i + 1];
        rgb.B = in[i + 2];

        current_row.push_back(rgb);
    }

    rows.push_back(current_row);
>>>>>>> 574e15d927e424816278b80276af665a09de71a2
    content.setPixels(rows);
}
