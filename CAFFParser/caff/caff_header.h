//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_HEADER_H
#define CAFFPARSER_CAFF_HEADER_H

#include <cstdint>

class CaffHeader {
private:
    char magic[5]{};
    uint64_t header_size{};
    uint64_t number_of_animations{};

public:
    const char *getMagic() const;

    uint64_t getHeaderSize() const;

    uint64_t getNumberOfAnimations() const;

    void setMagic(char* magic);

    void setHeaderSize(uint64_t headerSize);

    void setNumberOfAnimations(uint64_t numberOfAnimations);
};

#endif //CAFFPARSER_CAFF_HEADER_H
