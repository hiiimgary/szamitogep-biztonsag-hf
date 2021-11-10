cmake_minimum_required(VERSION 3.20)
project(szamitogep_biztonsag_hf)

set(CMAKE_CXX_STANDARD 14)

include_directories(caff)
include_directories(ciff)
include_directories(converter)

add_executable(szamitogep_biztonsag_hf
        caff/caff.cpp
        caff/caff.h
        caff/caff_animation.cpp
        caff/caff_animation.h
        caff/caff_credits.cpp
        caff/caff_credits.h
        caff/caff_header.cpp
        caff/caff_header.h
        ciff/ciff.cpp
        ciff/ciff.h
        ciff/ciff_content.cpp
        ciff/ciff_content.h
        ciff/ciff_header.cpp
        ciff/ciff_header.h
        converter/caff_to_gif.hpp
        converter/file_to_caff.hpp
        converter/gif.h
        main.cpp
        helper/help.h helper/help.cpp)
