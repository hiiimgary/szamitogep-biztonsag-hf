//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include "ciff_content.h"
#include "ciff.h"
#include <string.h>

#include <utility>
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


    // Setting content size

    // Setting width and height


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

}

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
    content.setPixels(rows);
}
