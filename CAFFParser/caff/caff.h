//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_H
#define CAFFPARSER_CAFF_H

#include <vector>

#include "caff_credits.h"
#include "caff_header.h"
#include "caff_animation.h"

class Caff {
private:
    CaffHeader header;
    CaffCredits credits;
    vector<CaffAnimation> animations;

public:
    Caff();
    ~Caff();

    void parseHeader(const vector<char>& block, uint64_t block_length);
    void parseCredits(vector<char> block, uint64_t block_length);
    void parseAnimation(const vector<char>& block, uint64_t block_length);

    vector<CaffAnimation> getCaffAnimations();

};

#endif //CAFFPARSER_CAFF_H
