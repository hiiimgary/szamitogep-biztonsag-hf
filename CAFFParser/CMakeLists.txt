cmake_minimum_required(VERSION 3.20)
project(CAFFParser)

set(CMAKE_CXX_STANDARD 14)

add_library(CAFFParser caff_parser.cpp main.cpp)
