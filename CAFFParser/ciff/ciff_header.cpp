//
// Created by Tamas on 2021. 11. 09..
//

#include "ciff_header.h"
#include <cstring>

uint64_t CiffHeader::getHeaderSize() const {
    return header_size;
}

uint64_t CiffHeader::getContentSize() const {
    return content_size;
}

uint64_t CiffHeader::getWidth() const {
    return width;
}

uint64_t CiffHeader::getHeight() const {
    return height;
}

const std::string &CiffHeader::getCaption() const {
    return caption;
}

const std::vector<std::string> &CiffHeader::getTags() const {
    return tags;
}

void CiffHeader::setHeaderSize(uint64_t headerSize) {
    header_size = headerSize;
}

void CiffHeader::setContentSize(uint64_t contentSize) {
    content_size = contentSize;
}

void CiffHeader::setWidth(uint64_t width) {
    CiffHeader::width = width;
}

void CiffHeader::setHeight(uint64_t height) {
    CiffHeader::height = height;
}

void CiffHeader::setCaption(const std::string &caption) {
    CiffHeader::caption = caption;
}

void CiffHeader::setTags(const std::vector<std::string> &tags) {
    CiffHeader::tags = tags;
}

CiffHeader::CiffHeader() {

}

CiffHeader::~CiffHeader() {}


