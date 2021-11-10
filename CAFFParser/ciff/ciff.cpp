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
