#pragma once

#ifdef D2HOB_EXPORTS
#define D2HOB_API __declspec(dllexport)
#else
#define D2HOB_API __declspec(dllimport)
#endif

///Convert decimal(base10) to binary(base2)
extern "C" D2HOB_API long long convertD2B(int dec);

///Convert binary(base2) to decimal(base10)
extern "C" D2HOB_API int convertB2D(long long bin);