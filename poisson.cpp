#include <emscripten/bind.h>
#include <random>
using namespace emscripten;
using namespace std;
/* this is poisson */
float poisson(int mean,int frame_rate) {

  random_device rd;
  mt19937 gen(rd());
	poisson_distribution <int> distribution(float(mean)/frame_rate);
  return distribution(gen);
}

EMSCRIPTEN_BINDINGS(my_module) {
  function("poisson", &poisson);
}
