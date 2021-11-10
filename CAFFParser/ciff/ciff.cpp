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
