//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_HEADER_H
#define CAFFPARSER_CAFF_HEADER_H

#include <cstdint>

class CaffHeader {
private:
    uint64_t header_size{};
    uint64_t number_of_animations{};

public:
    uint64_t getHeaderSize() const;

    uint64_t getNumberOfAnimations() const;

    void setHeaderSize(uint64_t headerSize);

    void setNumberOfAnimations(uint64_t numberOfAnimations);
};

#endif //CAFFPARSER_CAFF_HEADER_H
