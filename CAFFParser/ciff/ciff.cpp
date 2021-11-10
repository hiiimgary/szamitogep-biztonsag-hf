//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include "ciff_content.h"
#include "ciff.h"

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
    header.setMagic(vectorToString(trim(animation, 0, 3)));

    // Setting header size


    // Setting content size

    // Setting width and height


}

uint64_t Ciff::parseCaption(std::vector<char> in, uint64_t from) {
    int size = in.size();
    char* tmp = new char[size];

    int i = 0;
    for (i; i < size; i++) {
        tmp[i - from] = in[i + from];
        if (in[i] == '\n') {
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

}
