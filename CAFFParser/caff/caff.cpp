//
// Created by patta on 11/8/2021.
//

#include "caff.h"
#include <fstream>
#include <cstring>
#include "../helper/help.h"

using namespace std;

Caff::Caff() : header(CaffHeader()), credits(CaffCredits()), animations(vector<CaffAnimation>()) {}

Caff::~Caff() {
    for (int i = 0; i < animations.size(); i++) {
        delete animations.at(i).getCiff();
    }
}

void Caff::parseHeader(const vector<char>& block, uint64_t block_length) {
    char* magic = vectorToString(trim(block, 0, 3));

    if (strcmp(magic, "CAFF") != 0) {
        throw "Not valid Caff Format";
    }
    delete[] magic;

    uint64_t header_size = toInt(trim(block, 4, 11));
    header.setHeaderSize(header_size);

    uint64_t num_anim = toInt(trim(block, 12, 19));
    header.setNumberOfAnimations(num_anim);
}

void Caff::parseCredits(vector<char> block, uint64_t block_length) {
    uint16_t year = toInt(trim(block, 0, 1));
    credits.setCreationYear(year);

    uint8_t month = block[2];
    credits.setCreationMonth(month);

    uint8_t day = block[3];
    credits.setCreationDay(day);

    uint8_t hour = block[4];
    credits.setCreationHour(hour);

    uint8_t minute = block[5];
    credits.setCreationMinute(minute);

    uint64_t creator_len = toInt(trim(block, 6, 13));
    credits.setCreatorLen(creator_len);

    printf("%d.%d.%d %d:%d\n", year, month, day, hour, minute); //createdAt

    char* creator = vectorToString(trim(block, 14, block_length - 1));
    if (creator_len != 0) {
        credits.setCreator(string(creator));
    }
    else {
        credits.setCreator(string(""));
    }
    printf("%s\n", creator); //creator
    delete[] creator;
}

void Caff::parseAnimation(const vector<char> &block, uint64_t block_length) {
    CaffAnimation caffAnimation = CaffAnimation();

    uint32_t duration = toInt(trim(block, 0, 7));
    caffAnimation.setDuration(duration);

    vector<char> animation = trim(block, 8, block_length - 1);

    Ciff* ciff = new Ciff();
    ciff->saveCiffPartsToVariables(animation);
    caffAnimation.setCiff(ciff);

    animations.push_back(caffAnimation);
}

vector<CaffAnimation> Caff::getCaffAnimations() {
    return animations;
}

