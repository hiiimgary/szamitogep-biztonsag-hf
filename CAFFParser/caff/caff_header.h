//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_HEADER_H
#define CAFFPARSER_CAFF_HEADER_H

class CaffHeader {
private:
    char magic[5];
    uint64_t header_size;
    uint64_t number_of_animations;

public:
    CaffHeader();
    ~CaffHeader();

    void setMagic(char* m);
    char* getMagic();

    void setHeaderSize(uint64_t header_s);
    uint64_t getHeaderSize();

    void setNumberOfAnimations(uint64_t num_of_animations);
    uint64_t getNumberOfAnimations();
};

#endif //CAFFPARSER_CAFF_HEADER_H
