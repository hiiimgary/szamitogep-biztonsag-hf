//
// Created by paulg on 2021. 11. 09..
//

#include <vector>
#include <cstdint>
#include <fstream>
#include "../caff/caff.h"
#include "file_to_caff.h"
#include "../data_manipulation/helper.h"

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
        uint64_t block_length = toInt(trim(contents, i + 1, i + 8));
        vector<char> block = trim(contents, i + 9, i + 8 + block_length);
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
