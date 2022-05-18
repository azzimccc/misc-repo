#include "pch.h" // use stdafx.h in Visual Studio 2017 and earlier
#include <utility>
#include <limits.h>
#include "D2HOBLib.h"

long long convertD2B(int dec) 
{
    long long bin = 0;
    int rem, i = 1;
    while (dec != 0) {
        rem = dec % 2;
        dec /= 2;
        bin += rem * i;
        i *= 10;
    }
    return bin;
}

int convertB2D(long long bin)
{
    int dec = 0, i = 0, rem;

    while (bin != 0) {
        rem = bin % 10;
        bin /= 10;
        dec += rem * pow(2, i);
        ++i;
    }
    return dec;
}