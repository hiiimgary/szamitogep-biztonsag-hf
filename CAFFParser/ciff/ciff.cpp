//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include "ciff_content.h"
#include "ciff.h"

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
    header.setHeaderSize(toInt(trim(animation, 4, 11)));

    // Setting content size
    header.setContentSize(toInt(trim(animation, 12, 19)));

    // Setting width and height
    header.setWidth(toInt(trim(animation, 20, 27)));
    header.setHeight(toInt(trim(animation, 28, 35)));

//    uint64_t index = parseCaption(animation, 36);
//
//    parseTags(animation, index + 1, header_size);
//
//    parseContent(animation, header_size, animation.size(), width, height);


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
