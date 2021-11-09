//
// Created by paulg on 2021. 11. 09..
//

#ifndef CAFFPARSER_FILE_TO_CAFF_H
#define CAFFPARSER_FILE_TO_CAFF_H

/// conversion function
void fileReader(string input_file);
/// helpers
vector<char> trim(vector<char> in, uint64_t from, uint64_t to);

uint64_t toInt(const vector<char>& in);
char* vectorToString(vector<char> in);

#endif //CAFFPARSER_FILE_TO_CAFF_H
