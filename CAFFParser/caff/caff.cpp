//
// Created by patta on 11/8/2021.
//

#include "caff.h"
#include <fstream>
#include <string.h>

using namespace std;

Caff::Caff() : header(CaffHeader()), credits(CaffCredits()), animations(vector<CaffAnimation>()) {}

Caff::~Caff() {
//    for (int i = 0; i < animations.size(); i++) {
//        delete animations.at(i).getCiff();
//    }
}

vector<char> Caff::slice(vector<char> const& in, uint64_t from, uint64_t to) {
    auto start = in.begin() + from;
    auto end = in.begin() + to + 1;
    vector<char> vec(start, end);

    return vec;
}

char* Caff::vectorToString(vector<char> in) {
    uint64_t size = in.size();
    char* tmp = new char[size + 1];

    for (int i = 0; i < size; i++) {
        tmp[i] = in[i];
    }

    tmp[size] = '\0';
    return tmp;
}

uint64_t Caff::vectorToInt(const vector<char>& in) {
    char* tmp = vectorToString(in);
    uint64_t ret = *((uint64_t*)tmp);
    delete[] tmp;
    return ret;
}

void Caff::parseHeader(const vector<char>& block, uint64_t block_length) {
    printf("------HEADER---------\n");
    char* magic = vectorToString(slice(block, 0, 3));
    printf("Magic: %s\n", magic);
    delete[] magic;

    if (strcmp(magic, "CAFF") != 0) {
        throw "Not valid Caff Format";
    }


    uint64_t header_size = vectorToInt(slice(block, 4, 11));
    header.setHeaderSize(header_size);
    printf("headerSize: %d\n", header_size);

    uint64_t num_anim = vectorToInt(slice(block, 12, 19));
    header.setNumberOfAnimations(num_anim);
    printf("NumberOfAnimations: %d\n", num_anim);
}

void Caff::parseCredits(vector<char> block, uint64_t block_length) {
    printf("------CREDITS---------\n");
    uint16_t year = vectorToInt(slice(block, 0, 1));
    credits.setCreationYear(year);

    uint8_t month = block[2];
    credits.setCreationMonth(month);

    uint8_t day = block[3];
    credits.setCreationDay(day);

    uint8_t hour = block[4];
    credits.setCreationHour(hour);

    uint8_t minute = block[5];
    credits.setCreationMinute(minute);

    uint64_t creator_len = vectorToInt(slice(block, 6, 13));
    credits.setCreatorLen(creator_len);

    printf("CreatedAt: %d.%d.%d %d:%d\n", year, month, day, hour, minute);

    char* creator = vectorToString(slice(block, 14, block_length - 1));
    if (creator_len != 0) {
        credits.setCreator(string(creator));
    }
    else {
        credits.setCreator(string(""));
    }
    printf("Creator: %s\n", creator);
    delete[] creator;
}

void Caff::parseAnimation(const vector<char> &block, uint64_t block_length) {
    printf("------ANIMATION---------\n");
    CaffAnimation caffAnimation = CaffAnimation();

    uint32_t duration = vectorToInt(slice(block, 0, 7));
    caffAnimation.setDuration(duration);
    printf("duration: %d\n", duration);

    vector<char> animation = slice(block, 8, block_length - 1);

//    Ciff* ciff = new Ciff();
//    ciff->saveCiffPartsToVariables(animation);
//    caffAnimation.setCiff(ciff);
//
//    animations.push_back(caffAnimation);
}

vector<CaffAnimation> Caff::getCaffAnimations() {
    return animations;
}

