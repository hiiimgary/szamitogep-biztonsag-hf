//
// Created by Tamas on 2021. 11. 09..
//

#ifndef CAFFPARSER_CIFF_HEADER_H
#define CAFFPARSER_CIFF_HEADER_H

#include <cstdint>
#include <string>
#include <vector>

class CiffHeader {
private:
    char magic[4] {};
    uint64_t header_size{};
    uint64_t content_size{};
    uint64_t width{};
    uint64_t height{};
    std::string caption;
    std::vector<std::string> tags;
public:
    uint64_t getHeaderSize() const;

    uint64_t getContentSize() const;

    uint64_t getWidth() const;

    uint64_t getHeight() const;

    const std::string &getCaption() const;

    const std::vector <std::string> &getTags() const;

    void setHeaderSize(uint64_t headerSize);

    void setContentSize(uint64_t contentSize);

    void setWidth(uint64_t width);

    void setHeight(uint64_t height);

    void setCaption(const std::string &caption);

    void setTags(const std::vector<std::string> &tags);
};

#endif //CAFFPARSER_CIFF_HEADER_H