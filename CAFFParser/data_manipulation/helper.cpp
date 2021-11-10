//
// Created by paulg on 2021. 11. 10..
//

#include <vector>
#include <cstdint>
#include "helper.h"

std::vector<char> trim(std::vector<char> data, uint64_t begin_offset, uint64_t end_offset) {
    auto begin = data.begin() + begin_offset;
    auto end = data.begin() + end_offset + 1;
    std::vector<char> ret(begin, end);
    return ret;
}

uint64_t toInt(const std::vector<char>& data) {
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

char* vectorToString(std::vector<char> in) {
    uint64_t size = in.size();
    char* tmp = new char[size + 1];

    for (int i = 0; i < size; i++)
    {
        tmp[i] = in[i];
    }

    tmp[size] = '\0';
    return tmp;
}
