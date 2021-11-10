//
// Created by paulg on 2021. 11. 10..
//

#ifndef SZAMITOGEP_BIZTONSAG_HF_HELP_H
#define SZAMITOGEP_BIZTONSAG_HF_HELP_H

#include <vector>
#include <cstdint>

std::vector<char> trim(std::vector<char> data, uint64_t begin_offset, uint64_t end_offset);
uint64_t toInt(const std::vector<char>& data);
char* vectorToString(std::vector<char> in);

#endif //SZAMITOGEP_BIZTONSAG_HF_HELP_H
