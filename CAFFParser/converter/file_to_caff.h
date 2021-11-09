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
vector<char> trim(vector<char> data, uint64_t begin_offset, uint64_t end_offset);
uint64_t toInt(const vector<char>& data);


char* vectorToString(vector<char> in);
uint64_t vectorToInt(const vector<char>& in);


#endif //CAFFPARSER_FILE_TO_CAFF_H
