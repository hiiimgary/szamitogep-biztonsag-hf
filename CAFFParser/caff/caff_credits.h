//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_CREDITS_H
#define CAFFPARSER_CAFF_CREDITS_H

#include <string>

using namespace std;

class CaffCredits {
private:
    uint16_t creation_year;
    uint8_t creation_month;
    uint8_t creation_day;
    uint8_t creation_hour;
    uint8_t creation_minute;
    uint64_t creator_len;
    string creator;

public:
    CaffCredits();
    ~CaffCredits();

    void setCreationYear(uint16_t year);
    uint16_t getCreationYear();

    void setCreationMonth(uint8_t month);
    uint8_t getCreationMonth();

    void setCreationDay(uint8_t day);
    uint8_t getCreationDay();

    void setCreationHour(uint8_t hour);
    uint8_t getCreationHour();

    void setCreationMinute(uint8_t minute);
    uint8_t getCreationMinute();

    void setCreatorLen(uint64_t length);
    uint64_t getCreatorLen();

    void setCreator(const string& name);
    string getCreator();
};

#endif //CAFFPARSER_CAFF_CREDITS_H
