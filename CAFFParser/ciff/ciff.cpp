//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include "ciff_content.h"
#include "ciff.h"

CiffHeader Ciff::getHeader() {
    return header;
}

CiffContent Ciff::getContent() {
    return content;
}