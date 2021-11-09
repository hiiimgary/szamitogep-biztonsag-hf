//
// Created by patta on 11/8/2021.
//

#ifndef CAFFPARSER_CAFF_ANIMATION_H
#define CAFFPARSER_CAFF_ANIMATION_H

struct CaffAnimation {
private:
    uint64_t duration;
//    Ciff* ciff;

public:
    CaffAnimation();
    ~CaffAnimation();

    void setDuration(uint64_t d);
    uint64_t getDuration();

//    void setCiff(Ciff* c);
//    Ciff* getCiff();
};

#endif //CAFFPARSER_CAFF_ANIMATION_H
