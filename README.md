# Binnacle: ICSE 2020 Artifact

ICSE 2020 Artifact for: `Learning from, Understanding, and Supporting DevOps Artifacts for Docker`.

## Requirements

To use this artifact, the following dependencies are required:

- A working installation of [Docker](https://docs.docker.com/get-docker/)

- Bash

We recommend running experiments on a `*nix` system but have encapsulated all of the necessary
infrastructure via Docker to make it possible (albeit less automatic) to run on any system with
a working Docker install.

For inspecting data locally (without the use of Docker) the following tools are recommended:

- [xz](https://tukaani.org/xz/) (Commonly provided by `xz-utils`.)
- [jq](https://github.com/stedolan/jq) (This is an excellent tool allowing `awk` and `grep` like manipulation of JSON objects from the command line.)

## Installation

See `./INSTALL.md` or just run:

```bash
git clone https://github.com/jjhenkel/binnacle-icse2020.git

cd ./binnacle-icse2020
```

**Note:** the rest of this README assumes you are working in the repository corresponding to this artifact.

## Reproducing experimental results 

We provide the tools and data necessary to reproduce our experimental results. For the most part these experiments attempt to execute on multiple threads and most finish within an hour. In this artifact, we have upgraded our original data pipeline to de-duplicate files prior to running experiments. This has created small deviations in some of the metrics reported in our accepted submission---these metrics have been updated in our Camera Ready draft to correspond with the new (de-duplicated) pipeline outputs present in this artifact.

### RQ1 - EU Nodes

To reproduce the plots and metrics for Research Question 1, the following scripts can be used:

```bash
# To generate the data (by re-running our experiments on the included datasets)
./experiments/1-effectively-uninterpretable-nodes/run.sh

# To render a PDF file containing the relevant figure
./experiments/1-effectively-uninterpretable-nodes/render.sh
```

Doing the above should produce a PDF file, containing the figure, at: `./experiments/1-effectively-uninterpretable-nodes/experiment/figure.pdf`.

### RQ2 - Automated Rule Mining

To reproduce our mined rules the following script can be used:

```bash
# To mine rules, automatically
./experiments/2-automated-rule-mining/run.sh
```

Doing the above should produce a the following file (containing a JSON encoding of the mined rules): `./experiments/2-automated-rule-mining/experiment/mined-rules.json`.

For reference, we have included an example of the rules that should be mined at: `./experiments/2-automated-rule-mining/experiment/mined-rules-example.json`.

### RQ3 - Rule Enforcement

To reproduce the data for Research Question 3 the following scripts can be used:

```bash
# To generate the data (by re-running our experiments on the included datasets)
./experiments/3-static-rule-enforcement/run.sh

# To render a PDF file containing the relevant figure
./experiments/3-static-rule-enforcement/render.sh
```

Doing the above should produce a PDF file, containing the figure, at: `./experiments/3-static-rule-enforcement/experiment/figure.pdf`. **Note:** we are rendering a lot more data in the generated figure than what was included in our accepted paper---this expanded presentation will appear in our Camera Ready version.

#### RQ3 - Extras

```bash
# If you wish to run against ALL of the Dockerfiles and not just the Gold Set
# we have also made that functionality available via:
./experiments/3-static-rule-enforcement/run.sh --full

# This is much slower, and this data is not included in the rendered figure,
# but it will be present in the following files:
./experiments/3-static-rule-enforcement/experiment/results-github-individual.txt
./experiments/3-static-rule-enforcement/experiment/results-github-summary.txt
```

## Accessing our data

Thanks to `xz`'s excellent compressions, you already have it!

All of the data (including the original source-level `Dockerfiles`) has been included directly in the GitHub repository for `binnacle`. The `./datasets` folder contains, in its `README.md`, extensive documentation on each representation of our data and examples for how to work with our data at each stage of processing. We hope that this will give others a jump-start toward working in this area.
