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
    input.open(input_file, ios::in | ios::binary);
    if (!input.is_open()) throw "input file could not be opened, exiting...\n";

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
                throw "content type mismatch in caff header, exiting...\n";
        }
        i += 9 + block_length;
    }

    input.close();
    printf("end of file reached, closing stream...\n");
    return caff;
}

vector<char> trim(vector<char> data, uint64_t begin_offset, uint64_t end_offset) {
    auto begin = data.begin() + begin_offset;
    auto end = data.begin() + end_offset;
    vector<char> ret(begin, end);
    return ret;
}

uint64_t toInt(const vector<char>& data) {
    uint64_t size = data.size();
    char* tmp = new char[size + 1];

    for (int i = 0; i < size; i++)
    {
        tmp[i] = data[i];
    }
    tmp[size] = '\0';
    uint64_t n = *((uint64_t*)tmp);
    delete[] tmp;
    return n;
}

char* vectorToString(vector<char> in) {
    uint64_t size = in.size();
    char* tmp = new char[size + 1];

    for (int i = 0; i < size; i++)
    {
        tmp[i] = in[i];
    }

    tmp[size] = '\0';
    return tmp;
}

uint64_t vectorToInt(const vector<char>& in) {
    char* tmp = vectorToString(in);
    uint64_t ret = ((uint64_t)tmp);
    delete[] tmp;
    return ret;
}