//
// Created by paulg on 2021. 11. 09..
//

#ifndef CAFFPARSER_FILE_TO_CAFF_H
#define CAFFPARSER_FILE_TO_CAFF_H

#include <vector>
#include <cstring>
#include "../caff/caff.h"

/// conversion function
Caff* fileReader(string input_file);
/// helpers
vector<char> trim(vector<char> in, uint64_t from, uint64_t to);
uint64_t toUint64(vector<char> numAsCharVec);

#endif //CAFFPARSER_FILE_TO_CAFF_H
