//
// Created by Tamas on 2021. 11. 09..
//

#ifndef CAFFPARSER_CIFF_H
#define CAFFPARSER_CIFF_H

#include "ciff_header.h"
#include "ciff_content.h"

class Ciff {
private:
    CiffHeader header{};
    CiffContent content{};
public:
    CiffHeader getHeader();
    CiffContent getContent();
};

#endif //CAFFPARSER_CIFF_H
