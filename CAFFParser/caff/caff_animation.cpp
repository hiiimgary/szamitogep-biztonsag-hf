//
// Created by patta on 11/8/2021.
//

#include "caff_animation.h"

CaffAnimation::CaffAnimation() {
//    ciff = nullptr;
    duration = 0;
}

CaffAnimation::~CaffAnimation() {}

void CaffAnimation::setDuration(uint64_t d) {

}

uint64_t CaffAnimation::getDuration() {
    return 0;
}

void CaffAnimation::setCiff(Ciff *c) {
    ciff = c;
}

Ciff *CaffAnimation::getCiff() {
    return ciff;
}
