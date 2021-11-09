//
// Created by paulg on 2021. 11. 09..
//

#include <vector>
#include <cstdint>
#include <fstream>
#include "../caff/caff.h"
#include "file_to_caff.h"

Caff* fileReader(string input_file) {
    /// open filestream
    ifstream input;
    input.open(input_file);
    if (!input) throw "input file could not be opened, exiting...\n";

    /// read data into bytes
    streampos start = input.tellg();
    input.seekg(0, std::ios::end);
    streampos end = input.tellg();
    input.seekg(0, std::ios::beg);

    vector<char> contents;
    contents.resize(static_cast<size_t>(end - start));

    input.read(&contents[0], contents.size());

    Caff* caff = new Caff();
    int i = 0;
    while (i < contents.size()) {
        uint64_t block_length = toUint64(trim(contents, i + 1, i + 9));
        vector<char> block = trim(contents, i + 9, i + 9 + block_length);
        switch (contents[i]){
            case 1:
                caff->parseHeader(block, block_length);
                break;
            case 2:
                caff->parseCredits(block, block_length);
                break;
            case 3:
                caff->parseAnimation(block, block_length);
                break;
            default:
                throw "content type mismatch in caff header, exiting...\n";
        }
        i += 9 + block_length;
    }

    input.close();
    printf("end of file reached, closing stream...\n");
    return caff;
}

vector<char> trim(vector<char> in, uint64_t from, uint64_t to) {
    auto begin = in.begin() + from;
    auto end = in.begin() + to;
    vector<char> ret(begin, end);
    return ret;
}

uint64_t toUint64(vector<char> numAsCharVec) {
    uint64_t n = 0;
    for (int i = 0; i < 8; i++) {
        n = (n << 8) + (numAsCharVec[i] & 0xFF);
    }
    return n;
}