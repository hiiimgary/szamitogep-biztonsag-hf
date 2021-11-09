//
// Created by paulg on 2021. 11. 09..
//

#include <vector>
#include <cstdint>
#include <fstream>
#include "../caff/caff.h"
#include "file_to_caff.h"

void fileReader(string input_file) {
    /// open filestream
    ifstream input;
    input.open("../samples/1.caff", ios::in | ios::binary);
    if (!input.is_open()) {
        printf("input file could not be opened, exiting...\n");
        return;
    }

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
        uint64_t block_length = toInt(trim(contents, i + 1, i + 9));
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
                printf("content type mismatch in caff header, exiting...\n");
                return;
        }
        i += 9 + block_length;
    }

    input.close();
    printf("end of file reached, closing stream...\n");
}

vector<char> trim(vector<char> in, uint64_t from, uint64_t to) {
    auto start = in.begin() + from;
    auto end = in.begin() + to;
    vector<char> vec(start, end);
    return vec;
}

uint64_t toInt(const vector<char>& in) {
    char* tmp = vectorToString(in);
    uint64_t ret = *((uint64_t*)tmp);
    delete[] tmp;
    return ret;
}
char* vectorToString(vector<char> in) {
    uint64_t size = in.size();
    char* tmp = new char[size + 1];

    for (int i = 0; i < size; i++) {
        tmp[i] = in[i];
    }

    tmp[size] = '\0';
    return tmp;
}