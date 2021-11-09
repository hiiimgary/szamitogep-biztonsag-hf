//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_H
#define CAFFPARSER_CAFF_H

#include <vector>

#include "caff_credits.h"
#include "caff_header.h"
#include "caff_animation.h"

using namespace std;

class Caff {
private:
    CaffHeader header;
    CaffCredits credits;

    void parseHeader(const vector<char>& block, uint64_t block_length);
    void parseCredits(vector<char> block, uint64_t block_length);
    void parseAnimation(const vector<char>& block, uint64_t block_length);

    vector<char> slice(vector<char> const& in, uint64_t from, uint64_t to);
    char* vectorToString(vector<char> in);
    uint64_t vectorToInt(const vector<char>& in);

public:
    Caff();
    ~Caff();

    vector<CaffAnimation> getCaffAnimations();
    vector<char> readFile(string fileName);
    uint64_t parseBlock(vector<char> content, uint64_t index);

};

#endif //CAFFPARSER_CAFF_H