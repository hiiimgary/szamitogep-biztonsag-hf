//
// Created by patta on 11/8/2021.
//

#include "caff_header.h"


const char *CaffHeader::getMagic() const {
    return magic;
}

uint64_t CaffHeader::getHeaderSize() const {
    return header_size;
}

uint64_t CaffHeader::getNumberOfAnimations() const {
    return number_of_animations;
}

void CaffHeader::setHeaderSize(uint64_t headerSize) {
    header_size = headerSize;
}

void CaffHeader::setNumberOfAnimations(uint64_t numberOfAnimations) {
    number_of_animations = numberOfAnimations;
}

void CaffHeader::setMagic(char *magic) {

}
