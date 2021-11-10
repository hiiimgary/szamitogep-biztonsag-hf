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

    uint64_t parseCaption(std::vector<char> in, uint64_t from);
    void parseTags(std::vector<char> in, uint64_t from, uint64_t to);
    void parseContent(std::vector<char> in, uint64_t from, uint64_t to, uint64_t width, uint64_t height);
public:
    CiffHeader getHeader();
    CiffContent getContent();

    void saveCiffPartsToVariables(std::vector<char> animation);
};

#endif //CAFFPARSER_CIFF_H
