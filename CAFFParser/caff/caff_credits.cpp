//
// Created by patta on 11/8/2021.
//

#include "caff_credits.h"

void CaffCredits::setCreator(const string &name) {
    creator = name;
}

string CaffCredits::getCreator() {
    return creator;
}

uint64_t CaffCredits::getCreatorLen() {
    return creator_len;
}

void CaffCredits::setCreatorLen(uint64_t length) {
    creator_len = length;
}

uint8_t CaffCredits::getCreationMinute() {
    return creation_minute;
}

void CaffCredits::setCreationMinute(uint8_t minute) {
    creation_minute = minute;

}

uint8_t CaffCredits::getCreationHour() {
    return creation_hour;
}

void CaffCredits::setCreationHour(uint8_t hour) {
    creation_hour = hour;

}

void CaffCredits::setCreationDay(uint8_t day) {
    creation_day = day;
}

uint8_t CaffCredits::getCreationMonth() {
    return creation_month;
}

uint8_t CaffCredits::getCreationDay() {
    return creation_day;
}

void CaffCredits::setCreationMonth(uint8_t month) {
    creation_month = month;
}

uint16_t CaffCredits::getCreationYear() {
    return creation_year;
}

void CaffCredits::setCreationYear(uint16_t year) {
    creation_year = year;
}

CaffCredits::~CaffCredits() {

}

CaffCredits::CaffCredits() : creator(string("")) {
    creation_year = 0;
    creation_month = 0;
    creation_day = 0;
    creation_hour = 0;
    creation_minute = 0;
    creator_len = 0;
}

