//
// Created by patta on 11/8/2021.
//

#include "caff.h"
#include <fstream>

using namespace std;

vector<char> Caff::readFile(string fileName) {
    ifstream caffFile;

    caffFile.open(fileName, ios::in | ios::binary);

    if (!caffFile.is_open()) {
        throw "Cannot open file";
    }

    streampos  start = caffFile.tellg();

    caffFile.seekg(0, ios::end);
    streampos end = caffFile.tellg();

    caffFile.seekg(0, ios::beg);

    vector<char> content;
    content.resize(static_cast<size_t>(end - start));
    caffFile.read(&content[0], content.size());
    return content;
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

uint64_t Caff::parseBlock(vector<char> content, uint64_t index) {
    uint64_t block_type = content[index];
    uint64_t block_length = vectorToInt(slice(content, index + 1, index + 8));
    vector<char> block = slice(content, index + 9, index + 9 + block_length - 1);

    if (block_type == 1) {
        parseHeader(block, block_length);
    } else if (block_type == 2) {
        parseCredits(block, block_length);
    } else if (block_type == 3) {
        parseAnimation(block, block_length);
    }

    return index + 9 + block_length;
}

void Caff::parseHeader(const vector<char>& block, uint64_t block_length) {
    char* magic = vectorToString(slice(block, 0, 3));
    header.setMagic(magic);
    printf("Magic: %s\n", magic);
    delete[] magic;

    uint64_t header_size = vectorToInt(slice(block, 4, 11));
    header.setHeaderSize(header_size);

    uint64_t num_anim = vectorToInt(slice(block, 12, 19));
    header.setNumberOfAnimations(num_anim);
}

void Caff::parseCredits(vector<char> block, uint64_t block_length) {

}

void Caff::parseAnimation(const vector<char> &block, uint64_t block_length) {

}

