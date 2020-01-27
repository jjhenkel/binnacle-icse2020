# Datasets

This directory provides our datasets of Dockerfiles. We have included the datasets in each of the (many) representations they pass through prior to rule mining. In doing so, we hope that others can expand, improve, revise, and compare with our rule mining pipeline.

Each sub-folder (except `./6-gold-rules`) will have a `github.*` file and a, substantially smaller, `gold.*` file. The `github.*` files correspond to our set of (~220,000 original, ~180,000 deduplicated) Dockerfiles sourced from GitHub. The `gold.*` files correspond to the subset of the GitHub data that originated in the `docker-library/` GitHub organization. The `docker-library/` organization is run by Docker and contains files of, presumably, high quality.

## (0a) `datasets/0a-original-dockerfile-sources`

This representation has the original Dockerfiles at the source level. These were downloaded directly from GitHub and, at this stage, have had no processing of any kind applied. They were selected using a, very permissive, file-name-based filter: `*.(D|d)ockerfile.*`.

This selector yields closer to ~250,000 files, we only kept files that passed a very basic syntactic validation; namely, we rejected files that failed to parse using the Python `dockerfile` parser package.

### Example Usage

**Representation:** this dataset is an archive file (format: `.tar.xz`) that, when extracted, yields a directory with each Dockerfile's original source (as text) saved into a file with a name based on the unique ID GitHub assigned to that file. (Unique ID's were extracted from GitHub's API.)

**Example:** 
```bash
tar -xvJf ./datasets/0a-original-dockerfile-sources/github.tar.xz
cat ./sources/484097305.Dockerfile
```
```Dockerfile
FROM busybox
EXPOSE 80/tcp
COPY httpserver .
CMD ["./httpserver"]
```

### Dataset Statistics

Size:
```
github.tar.xz: 20M compressed/897M uncompressed
gold.tar.xz: 64K compressed/2.2M uncompressed
```

Count:
```
github.tar.xz: 219061 files
gold.tar.xz: 432 files
```

Verify counts with:
```bash
# github
tar -tJf ./0a-original-dockerfile-sources/github.tar.xz \
  | grep '.Dockerfile' \
  | wc -l
# gold
tar -tJf ./0a-original-dockerfile-sources/gold.tar.xz \
  | grep '.Dockerfile' \
  | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
2bcd4448c587d0afac9b7dfbd84897326eec86ae728317c17d9404aeef3c4d05

gold.tar.xz (uncompressed contents):
45decb7a78f44f3ba8210918141c74a38541e686b451a583029f1dfe959a40a6
```

Verify hashes with:
```bash
# github
tar -xJOf ./0a-original-dockerfile-sources/github.tar.xz \
  | sha256sum | awk '{ print $1 }'
# gold
tar -xJOf ./0a-original-dockerfile-sources/gold.tar.xz \
  | sha256sum | awk '{ print $1 }'
```

## (0b) `datasets/0b-deduplicated-dockerfile-sources`

Here we have the Dockerfiles that are unique based on a hash of their contents. (A small area of improvement may be removing comments prior to doing deduplication.)

### Example Usage

**Representation:** this dataset is an archive file (format: `.tar.xz`) that, when extracted, yields a directory with each of the unique (source level) Dockerfiles. The filenames correspond to the unique hash of the contents of each file.

**Example:** 
```bash
tar -xvJf ./0b-deduplicated-dockerfile-sources/github.tar.xz
cat ./deduplicated-sources/f9f9726d2643993eb2176491858b7875ae332d05.Dockerfile 
```
```Dockerfile
# https://hub.docker.com/r/consensysllc/go-ipfs/
# THANKS!!!!!

FROM ipfs/go-ipfs
COPY start_ipfs.sh /usr/local/bin/start_ipfs
```

### Dataset Statistics

Size:
```
github.tar.xz: 29M compressed/740M uncompressed
gold.tar.xz: 72K compressed/2.1M uncompressed
```

Count:
```
github.tar.xz: 178506 files
gold.tar.xz: 405 files
```

Verify counts with:
```bash
# github
tar -tJf ./0b-deduplicated-dockerfile-sources/github.tar.xz \
  | grep '.Dockerfile' \
  | wc -l
# Or/also
cat ./5-dockerfile-metadata/github.jsonl.xz \
  | xz -cd \
  | jq '.file_sha' \
  | sort -u \
  | wc -l
# gold
tar -tJf ./0b-deduplicated-dockerfile-sources/gold.tar.xz \
  | grep '.Dockerfile' \
  | wc -l
# Or/also
cat ./5-dockerfile-metadata/github.jsonl.xz \
  | xz -cd \
  | grep 'repo_full_name":"docker-library/' \
  | jq '.file_sha' \
  | sort -u \
  | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
de1b5c0cd0bb318a093a9efb19d446c755b1a4bf29f4649625a7f197c9f29fa6

gold.tar.xz (uncompressed contents):
4524dbe29d32027b239d367ca03359e40a74ff839367506a773cc623407b187f
```

Verify hashes with:
```bash
# github
tar -xJOf ./0b-deduplicated-dockerfile-sources/github.tar.xz \
  | sha256sum | awk '{ print $1 }'
# gold
tar -xJOf ./0b-deduplicated-dockerfile-sources/gold.tar.xz \
  | sha256sum | awk '{ print $1 }'
```

### Regenerate from representation (0a)

This is just an example (you may need to slightly modify this to work in your environment). This assumes, in your current directory, you've extracted `./0a-original-dockerfile-sources/github.tar.xz`:

```bash
# Mkdir to hold deduplicated sources
mkdir -p ./deduplicated-sources

# Deduplicate (using both representation 0a and 5-dockerfile-metadata)
while read p; do
  cat ./sources/$(echo "${p}" | jq -r .file_id).Dockerfile \
    > ./deduplicated-sources/$(echo "${p}" | jq -r .file_sha).Dockerfile;
done < <(
  cat ./5-dockerfile-metadata/github.jsonl.xz | xz -cd
)

# Compress
tar -cJvf ./0b-deduplicated-dockerfile-sources/github.tar.xz \
  ./deduplicated-sources/
```

## (1) `datasets/1-phase-1-dockerfile-asts`

Here, for each Dockerfile in the previous representation (one-to-one), we have an AST generated by a Python based Dockerfile parser. These ASTs are quite shallow and, unfortunately, not the best target for further analysis (hence the many stages of processing we employ).

### Example Usage

**Representation:** this dataset is a compressed (format: `jsonl.xz`) JSON lines file. Each Phase-I AST is stored as a JSON object (one per line).

**Example:** 
```bash
cat ./1-phase-1-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | grep '3d0d691c1745e14be0f1facd14c49e3fbbb750d8' \
  | jq
```

```json
{
  "type": "DOCKER-FILE",
  "children": [
    {
      "type": "DOCKER-FROM",
      "children": [
        {
          "type": "DOCKER-IMAGE-NAME",
          "value": "solaris",
          "children": []
        }
      ]
    },
    ...,
    {
      "type": "DOCKER-CMD",
      "children": [
        {
          "type": "DOCKER-CMD-ARG",
          "value": "./httpserver",
          "children": []
        }
      ]
    }
  ],
  "file_sha": "3d0d691c1745e14be0f1facd14c49e3fbbb750d8"
}
```

### Dataset Statistics

Size:
```
github.tar.xz: 32M compressed/338M uncompressed
gold.tar.xz: 56K compressed/1.5M uncompressed
```

Count:
```
github.tar.xz: 178452 files
gold.tar.xz: 405 files
```

Verify counts with:
```bash
# github
cat ./1-phase-1-dockerfile-asts/github.jsonl.xz | xz -cd | wc -l
# gold
cat ./1-phase-1-dockerfile-asts/gold.jsonl.xz | xz -cd | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
4a5ecd0fb902ac9e599de7fbe13d23b7e598a2384bd5936b09f745d1b45fc70a

gold.tar.xz (uncompressed contents):
045e387e678bb2740799fedf1e1bbfe4625042482eb6be2f8c9c6cc3aa2ed1e3
```

Verify hashes with:
```bash
# github
cat ./1-phase-1-dockerfile-asts/github.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
# gold
cat ./1-phase-1-dockerfile-asts/gold.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
```

### Re-generate from representation (0b)

To regenerate from deduplicated Dockerfile sources use: `./1-phase-1-dockerfile-asts/generate.sh` or (if not using a *nix system) manually build and run the Dockerfile in the `./1-phase-1-dockerfile-asts/generate/` directory. (If the second, manual, approach is used, one must volume mount `./0b-deduplicated-dockerfile-sources` to `/mnt/inputs` and `./1-phase-1-dockerfile-asts` to `/mnt/outputs`.)

## (2) `datasets/2-phase-2-dockerfile-asts`

In this representation we again have, for each Dockerfile AST from the previous step (one-to-one), a new AST in which embedded shell has been parsed using the [ShellCheck](https://github.com/koalaman/shellcheck) tool. This representation is richer and is comparable to the representation used in most recent Dockerfile studies have used.

(Dockerfiles need not embed _Bash_, so there is the possibility of parse failures that could be resolved by using, as one example, a PowerShell parser. Heuristically identifying the kind of embedded shell used and parsing more than Bash is an interesting opportunity for future work.)

### Example Usage

**Representation:** this dataset is a compressed (format: `jsonl.xz`) JSON lines file. Each Phase-I AST is stored as a JSON object (one per line).

**Example:** 
```bash
cat ./2-phase-2-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | grep '972b56dc14ff87faddd0c35a5f3b6a32597a36ed' \
  | jq
```

```json
{
  "children": [
    {
      "children": [
        {
          "value": "node",
          "children": [],
          "type": "DOCKER-IMAGE-NAME"
        },
        {
          "value": "10",
          "children": [],
          "type": "DOCKER-IMAGE-TAG"
        }
      ],
      "type": "DOCKER-FROM"
    },
    ...,
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "type": "BASH-COMMAND-PREFIX"
                },
                {
                  "children": [
                    {
                      "value": "npm",
                      "children": [],
                      "type": "BASH-LITERAL"
                    }
                  ],
                  "type": "BASH-COMMAND-COMMAND"
                },
                {
                  "children": [
                    {
                      "value": "install",
                      "children": [],
                      "type": "BASH-LITERAL"
                    },
                    {
                      "value": "--production",
                      "children": [],
                      "type": "BASH-LITERAL"
                    }
                  ],
                  "type": "BASH-COMMAND-ARGS"
                }
              ],
              "type": "MAYBE-SEMANTIC-COMMAND"
            }
          ],
          "type": "BASH-SCRIPT"
        }
      ],
      "type": "DOCKER-RUN"
    },
    ...,
    {
      "children": [
        {
          "value": "bin/cncjs",
          "children": [],
          "type": "DOCKER-CMD-ARG"
        }
      ],
      "type": "DOCKER-CMD"
    }
  ],
  "type": "DOCKER-FILE",
  "file_sha": "972b56dc14ff87faddd0c35a5f3b6a32597a36ed"
}

```

### Dataset Statistics

Size:
```
github.tar.xz: 36M compressed/1.2G uncompressed
gold.tar.xz: 76K compressed/7.9M uncompressed
```

Count:
```
github.tar.xz: 178452 files
gold.tar.xz: 405 files
```

Verify counts with:
```bash
# github
cat ./2-phase-2-dockerfile-asts/github.jsonl.xz | xz -cd | wc -l
# gold
cat ./2-phase-2-dockerfile-asts/gold.jsonl.xz | xz -cd | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
df99118d4e78a797a7e90e9950ea38859ad2d80e1029a6449953dbd6151c21e2

gold.tar.xz (uncompressed contents):
61b2c5f51368a78f026d2f1f389b13862888c65e2f9d585b69202871397890fa
```

Verify hashes with:
```bash
# github
cat ./2-phase-2-dockerfile-asts/github.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
# gold
cat ./2-phase-2-dockerfile-asts/gold.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
```


### Re-generate from representation (1)

To regenerate from Phase-I ASTs use: `./2-phase-2-dockerfile-asts/generate.sh` or (if not using a *nix system) manually build and run the Dockerfile in the `./2-phase-2-dockerfile-asts/generate/` directory. (If the second, manual, approach is used, one must volume mount `./1-phase-1-dockerfile-asts` to `/mnt/inputs` and `./2-phase-2-dockerfile-asts` to `/mnt/outputs`.)

## (3) `datasets/3-phase-3-dockerfile-asts`

In this penultimate representation we have another (one-to-one) mapping from ASTs in the previous step to new ASTs. The difference in this new representation is that yet another level of parsing has been applied (using ~50 generated parsers). Details on this Phase III representation and its utility are one of the primary facets of our paper.

### Example Usage

**Representation:** this dataset is a compressed (format: `jsonl.xz`) JSON lines file. Each Phase-III AST is stored as a JSON object (one per line).

```bash
cat ./3-phase-3-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | grep '972b56dc14ff87faddd0c35a5f3b6a32597a36ed' \
  | jq
```

```json
{
  "children": [
    {
      "children": [
        {
          "children": [],
          "type": "DOCKER-IMAGE-NAME",
          "value": "node"
        },
        {
          "children": [],
          "type": "DOCKER-IMAGE-TAG",
          "value": "10"
        }
      ],
      "type": "DOCKER-FROM"
    },
    ...,
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "type": "SC-NPM-F-PRODUCTION"
                }
              ],
              "type": "SC-NPM-INSTALL"
            }
          ],
          "type": "BASH-SCRIPT"
        }
      ],
      "type": "DOCKER-RUN"
    },
    ...,
    {
      "children": [
        {
          "children": [],
          "type": "DOCKER-CMD-ARG",
          "value": "bin/cncjs"
        }
      ],
      "type": "DOCKER-CMD"
    }
  ],
  "file_sha": "972b56dc14ff87faddd0c35a5f3b6a32597a36ed",
  "type": "DOCKER-FILE"
}
```

### Dataset Statistics

Size:
```
github.tar.xz: 30M compressed/838M uncompressed
gold.tar.xz: 64K compressed/4.9M uncompressed
```

Count:
```
github.tar.xz: 178452 files
gold.tar.xz: 405 files
```

Verify counts with:
```bash
# github
cat ./3-phase-3-dockerfile-asts/github.jsonl.xz | xz -cd | wc -l
# gold
cat ./3-phase-3-dockerfile-asts/gold.jsonl.xz | xz -cd | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
23719160c5c9fa687bc9c207f2c1624d41cb736b6b74cb97ebabdc8ca8696f34

gold.tar.xz (uncompressed contents):
182a7d0802f786d8a5dd552ee0cf57e8264c26c9a6c87256c30f6024e0267abe
```

Verify hashes with:
```bash
# github
cat ./3-phase-3-dockerfile-asts/github.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
# gold
cat ./3-phase-3-dockerfile-asts/gold.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
```

### Re-generate from representation (2)

To regenerate from Phase-II ASTs use: `./3-phase-3-dockerfile-asts/generate.sh` or (if not using a *nix system) manually build and run the Dockerfile in the `./3-phase-3-dockerfile-asts/generate/` directory. (If the second, manual, approach is used, one must volume mount `./2-phase-2-dockerfile-asts` to `/mnt/inputs` and `./3-phase-3-dockerfile-asts` to `/mnt/outputs`.)


## (4) `datasets/4-abstracted-asts`

Finally, for each enriched AST from the last representation (one-to-one), we apply a configurable group of Regex-based abstractions to literal values. This gives us new ASTs, in the same form, with additional "abstract" nodes that may be of value during pattern mining. Indeed, this is the representation of Dockerfiles we use for mining our patterns.

### Example Usage

**Representation:** this dataset is a compressed (format: `jsonl.xz`) JSON lines file. Each abstracted Phase-III AST is stored as a JSON object (one per line).

```bash
cat ./4-abstracted-asts/github.jsonl.xz \
  | xz -cd \
  | grep 'aaf505fc6efd672143ac63292122207db3f8b19b' \
  | jq
```

```json
{
  "children": [
    ...,
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "type": "BASH-VARIABLE:url"
                    }
                  ],
                  "type": "BASH-ASSIGN-LHS"
                },
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "type": "ABS-PROBABLY-URL",
                              "children": []
                            },
                            {
                              "type": "ABS-URL-PROTOCOL-HTTPS",
                              "children": []
                            }
                          ],
                          "type": "BASH-SINGLE-QUOTED"
                        },
                        {
                          "children": [],
                          "type": "BASH-LITERAL"
                        },
                        {
                          "children": [
                            {
                              "children": [],
                              "type": "BASH-VARIABLE:env"
                            },
                            {
                              "children": [],
                              "type": "BASH-LITERAL"
                            }
                          ],
                          "type": "BASH-CONCAT"
                        },
                        {
                          "children": [
                            {
                              "children": [],
                              "type": "BASH-VARIABLE:env"
                            },
                            {
                              "children": [],
                              "type": "BASH-LITERAL"
                            }
                          ],
                          "type": "BASH-CONCAT"
                        }
                      ],
                      "type": "BASH-ARRAY"
                    }
                  ],
                  "type": "BASH-ASSIGN-RHS"
                }
              ],
              "type": "BASH-ASSIGN"
            },
            {
              "children": [],
              "type": "UNKNOWN"
            }
          ],
          "type": "BASH-SCRIPT"
        }
      ],
      "type": "DOCKER-RUN"
    },
   ..,
  ],
  "file_sha": "aaf505fc6efd672143ac63292122207db3f8b19b",
  "type": "DOCKER-FILE"
}
```

### Dataset Statistics

Size:
```
github.tar.xz: 21M compressed/847M uncompressed
gold.tar.xz: 48K compressed/4.8M uncompressed
```

Count:
```
github.tar.xz: 178452 files
gold.tar.xz: 405 files
```

Verify counts with:
```bash
# github
cat ./4-abstracted-asts/github.jsonl.xz | xz -cd | wc -l
# gold
cat ./4-abstracted-asts/gold.jsonl.xz | xz -cd | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
5f77746eddce8f1fd4434c0847ab79859cd1674c67c42e6f82555564b70b1215

gold.tar.xz (uncompressed contents):
d661e5fea20eb84f73f18ccd4330d0a11682611847ef6c09d63d6cb3bc808605
```

Verify hashes with:
```bash
# github
cat ./4-abstracted-asts/github.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
# gold
cat ./4-abstracted-asts/gold.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
```

### Re-generate from representation (3)

To regenerate from Phase-III ASTs use: `./4-abstracted-asts/generate.sh` or (if not using a *nix system) manually build and run the Dockerfile in the `./4-abstracted-asts/generate/` directory. (If the second approach is used, one must volume mount `./3-phase-3-dockerfile-asts` to `/mnt/inputs` and `./4-abstracted-asts` to `/mnt/outputs`.)

## (5) `datasets/5-dockerfile-metadata`

This is an extra dataset (**not** derived from the previously listed representation) that contains JSON objects (one per line) with information on each of the Dockerfiles we used. 

### Example Usage

**Representation:** this dataset is a compressed (format: `jsonl.xz`) JSON lines file. Each Dockerfile metadata record is stored as a JSON object (one per line).

```bash
cat ./5-dockerfile-metadata/github.jsonl.xz \
  | xz -cd | grep 'file_id":133495483' | jq
```

```json
{
  "file_contents_scraped_at": "2019-06-24T22:10:06",
  "file_directory": "",
  "file_id": 133495483,
  "file_name": "Dockerfile",
  "file_sha": "a2f4e76c9a16dbdaecf623f2878dd66b9609c371",
  "file_url": "https://github.com/dordnung/System2/blob/master/Dockerfile",
  "repo_branch": "master",
  "repo_full_name": "dordnung/System2",
  "repo_id": 7636623
}
```

### Dataset Statistics

Size:
```
github.tar.xz: 9.2M compressed/83M uncompressed
gold.tar.xz: 20K compressed/156K uncompressed
```

Count:
```
github.tar.xz: 219061 files
gold.tar.xz: 432 files
```

Verify counts with:
```bash
# github
cat ./5-dockerfile-metadata/github.jsonl.xz | xz -cd | wc -l
# gold
cat ./5-dockerfile-metadata/gold.jsonl.xz | xz -cd | wc -l
```

Hashes:
```
github.tar.xz (uncompressed contents):
65674fb0812a7793f9ebf89b46af2622e0543b5f9223a5ed30ec774e7b758db5

gold.tar.xz (uncompressed contents):
16bce8507c00d4aa342fb199276ba238ea3bb58ebd3f850b912c8deb47cacddf
```

Verify hashes with:
```bash
# github
cat ./5-dockerfile-metadata/github.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
# gold
cat ./5-dockerfile-metadata/gold.jsonl.xz | xz -cd \
  | sha256sum | awk '{ print $1 }'
```

## (6) `datasets/6-gold-rules`

This is another extra dataset (**not** derived from the previously listed representations/datsets) that contains the TypeScript (TS) encoding of the 23 rules in our set of unfiltered _Gold Rules_. (Later in the
paper we make an effort to weed out _Gold Rules_ with low support/confidence when measured against the
Gold Set of Dockerfiles.) 

### Example Usage

**Representation:** this dataset is encoded into a TypeScript file.

```typescript
// Import the rules
import { RULES as ALL_RULES } from './gold-rules';

// Use a type (like this example) to give some structure to 
// the encoding
type Subtree = any;
export const RULES = [
  ...ALL_RULES
] as Array<{
  scope: 'INTRA-DIRECTIVE' | 'INTER-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT' 
    | 'CONSEQUENT-FLAG-OF-ANTECEDENT'
    | 'CONSEQUENT-PRECEDES-ANTECEDENT',
  name: string,
  description: string,
  antecedent: Subtree,
  consequent: { matchAnyBound: Subtree },
  source: string,
  notes: string|undefined
}>;

// ... do whatever processing/checking you wish 
```

### Dataset Statistics

Size:
```
gold-rules.ts: 16KB
```

Count:
```
gold-rules.ts: 23 rules (encoded as TypeScript objects)
```

Hashes:
```
gold-rules.ts:
170fe0e573e935039ab795530a023dcf22fc51a56d4b830a8453f2201f97536d
```

Verify hashes with:
```bash
# github
cat ./6-gold-rules/gold-rules.ts | sha256sum | awk '{ print $1 }'
```

---

## Notes

In general, when we map files from one representation to the next in a one-to-one way there is the possibility of failures (for various reasons: one example may be a Dockerfile that has a malformed RUN statement that isn't malformed according to the simple syntax of Dockerfiles but is according to ShellCheck's more refined understanding of Bash). Failures such as these will give us less data points in one representation than we had in the previous (even though, theoretically, we'd have a one-to-one correspondence).
