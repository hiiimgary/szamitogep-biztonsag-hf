cmake_minimum_required(VERSION 3.20)
project(CAFFParser)

set(CMAKE_CXX_STANDARD 14)

add_library(CAFFParser caff_parser.cpp main.cpp caff/caff.cpp caff/caff.h caff/caff_header.cpp caff/caff_header.h caff/caff_credits.cpp caff/caff_credits.h caff/caff_animation.cpp caff/caff_animation.h)
