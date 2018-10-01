#include <emscripten/bind.h>
#include <random>
using namespace emscripten;

float poisson(int mean,int frame_rate) {

    std::random_device rd;
    std::mt19937 gen(rd());
    std::poisson_distribution<int> distribution(float(mean)/frame_rate);
    return distribution(gen);
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("poisson", &poisson);
}
