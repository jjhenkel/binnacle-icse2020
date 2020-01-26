export const curlUseFlagF = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'curlUseFlagF',
  description: 'Use the -f flag when using curl.',
  antecedent: {
    type: 'SC-CURL',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-CURL-F-FAIL'
    }
  },
  source: 'https://github.com/docker-library/python/pull/73/commits/033320b278e78732e5739f19bca5f8f29573b553'
};

export const npmCacheCleanAfterInstall = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'npmCacheCleanAfterInstall',
  description: 'Run npm cache clean after npm install',
  antecedent: {
    type: 'SC-NPM-INSTALL'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-NPM-CACHE-CLEAN'
    }
  },
  source: 'https://github.com/docker-library/ghost/pull/186/commits/c3bac502046ed5bea16fee67cc48ba993baeaea8'
};

export const npmCacheCleanUseForce = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'npmCacheCleanUseForce',
  description: 'Use the --force flag when using npm cache clean.',
  antecedent: {
    type: 'SC-NPM-CACHE-CLEAN',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-NPM-F-FORCE'
    }
  },
  source: 'https://github.com/docker-library/ghost/pull/186/commits/c3bac502046ed5bea16fee67cc48ba993baeaea8',
  notes: 'Had to split into two rules to describe both adding npm cache clean and using the --force flag'
};

export const rmRecursiveAfterMktempD = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'rmRecursiveAfterMktempD',
  description: 'A rm -r should occur after a mktemp -d',
  antecedent: {
    type: 'SC-MKTEMP',
    children: [{
      type: 'SC-MKTEMP-F-DIRECTORY'
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-F-FORCE'
      }]
    }
  },
  source: 'IMPLICIT --- you should remove temporary dirs in docker images'
};

export const curlUseHttpsUrl = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'curlUseHttpsUrl',
  description: 'Use https:// urls with curl',
  antecedent: {
    type: 'SC-CURL',
    children: [{
      type: 'SC-CURL-URL',
      children: [{
        type: 'BASH-LITERAL',
        bindHere: true,
        children: [{
          type: 'ABS-PROBABLY-URL'
        }]
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'ABS-URL-PROTOCOL-HTTPS'
    }
  },
  source: 'https://github.com/docker-library/php/pull/293/commits/2f96a00aaa90ee1c503140724936ca7005273df5'
};

export const wgetUseHttpsUrl = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'wgetUseHttpsUrl',
  description: 'Use https:// urls with wget',
  antecedent: {
    type: 'SC-WGET',
    children: [{
      type: 'SC-WGET-URL',
      children: [{
        type: 'BASH-LITERAL',
        bindHere: true,
        children: [{
          type: 'ABS-PROBABLY-URL'
        }]
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'ABS-URL-PROTOCOL-HTTPS'
    }
  },
  source: 'https://github.com/docker-library/php/pull/293/commits/2f96a00aaa90ee1c503140724936ca7005273df5'
};

export const pipUseNoCacheDir = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'pipUseNoCacheDir',
  description: 'Use --no-cache-dir flag with pip',
  antecedent: {
    type: 'SC-PIP-INSTALL',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-PIP-F-NO-CACHE-DIR'
    }
  },
  source: 'https://github.com/docker-library/python/pull/50/commits/7663560df7547e69d13b1b548675502f4e0917d1'
};

export const mkdirUsrSrcThenRemove = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'mkdirUsrSrcThenRemove',
  description: 'After running mkdir /usr/src* use rm -rf /usr/src* to clean up.',
  antecedent: {
    type: 'SC-MKDIR',
    children: [{
      type: 'SC-MKDIR-PATHS',
      children: [{
        type: 'SC-MKDIR-PATH',
        children: [{
          type: 'BASH-LITERAL',
          children: [{
            type: 'ABS-USR-SRC-DIR'
          }]
        }]
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATHS',
        children: [{
          type: 'SC-RM-PATH',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-USR-SRC-DIR'
            }]
          }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/python/pull/20/commits/ce7da0b874784e6b69e3966b5d7ba995e873163e'
};

export const configureShouldUseBuildFlag = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'configureShouldUseBuildFlag',
  description: 'When using ./configure in a Dockerfile pass the --build flag.',
  antecedent: {
    type: 'SC-CONFIGURE',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-CONFIGURE-BUILD'
    }
  },
  source: 'https://github.com/docker-library/ruby/pull/127/commits/be55938d970a392e7d41f17131a091b0a9f4bebc'
};

export const gemUpdateSystemRmRootGem = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'gemUpdateSystemRmRootGem',
  description: 'After running gem update --system remove the /root/.gem directory.',
  antecedent: {
    type: 'SC-GEM-UPDATE'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATHS',
        children: [{
          type: 'SC-RM-PATH',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-PATH-ABSOLUTE'
            }, {
              type: 'ABS-PATH-DOT-GEM'
            }, {
              type: 'ABS-PATH-ROOT-DIR'
            }]
          }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/ruby/pull/185/commits/c9a4472a019d18aba1fdab6a63b96474b40ca191'
};

export const sha256sumEchoOneSpaces = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-PRECEDES-ANTECEDENT',
  name: 'sha256sumEchoOneSpaces',
  description: 'sha256sum takes an input on stdin with one space.',
  antecedent: {
    type: 'SC-SHA-256-SUM',
    children: [{
      type: 'SC-SHA-256-SUM-F-CHECK'
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-ECHO',
      children: [{
        type: 'SC-ECHO-ITEMS',
        children: [{
          type: 'SC-ECHO-ITEM',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-SINGLE-SPACE'
            }]
          }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/memcached/pull/6/commits/a8c4206768821aa47579c6413be85be914875caa',
  notes: 'sha1sum is old --- transliterated to use more modern sha256sum which most images are using'
};

export const gemUpdateNoDocument = {
  scope: 'INTER-DIRECTIVE',
  kind: 'CONSEQUENT-PRECEDES-ANTECEDENT',
  name: 'gemUpdateNoDocument',
  description: 'If you run gem update you should have previously added the --no-document flag to the .gemrc config.',
  antecedent: {
    type: 'SC-GEM-UPDATE'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-ECHO',
      children: [{
        type: 'SC-ECHO-ITEMS',
        children: [{
          type: 'SC-ECHO-ITEM',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-CONFIG-NO-DOCUMENT'
            }]
          }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/ruby/pull/49/files',
  notes: 'Either gem update or gem install leads us to wanting the --no-document/--no-rdoc flag to be set.'
};

export const gpgVerifyAscRmAsc = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'gpgVerifyAscRmAsc',
  description: 'If you run gpg --verify <X>.asc you should remove the <x>.asc file.',
  antecedent: {
    type: 'SC-GPG',
    children: [{
      type: 'SC-GPG-VERIFYS',
      children: [{
        type: 'SC-GPG-VERIFY',
        children: [{
          type: 'BASH-LITERAL',
          children: [{
            type: 'ABS-EXTENSION-ASC'
          }]
        }]
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATHS',
        children: [{
          type: 'SC-RM-PATH',
          // children: [{
          //   type: 'BASH-LITERAL',
          //   children: [{
          //     type: 'ABS-EXTENSION-ASC'
          //   }]
          // }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/php/pull/196/commits/8943e1e6a930768994fbc29f4df89d0a3fd65e12'
};

export const yumInstallForceYes = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'yumInstallForceYes',
  description: 'Use the -y flag with yum install.',
  antecedent: {
    type: 'SC-YUM-INSTALL',
    bindHere: true,
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-YUM-F-ASSUMEYES'
    }
  },
  source: 'IMPLICIT -- based on apt-get install -y rule'
};

export const yumInstallRmVarCacheYum = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'yumInstallRmVarCacheYum',
  description: 'If you run yum install <...> you should remove the /var/cache/yum directory.',
  antecedent: {
    type: 'SC-YUM-INSTALL'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATHS',
        children: [{
          type: 'SC-RM-PATH',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-VAR-CACHE-YUM'
            }]
          }]
        }]
      }, {
        type: 'SC-RM-F-RECURSIVE'
      }]
    }
  },
  source: 'https://github.com/docker-library/ruby/pull/7/commits/950a673e59df846608f624ee55321d36ba1f89ba',
  notes: 'The source here is for apt-get. This rule is the natural translation to yum.'
};

export const tarSomethingRmTheSomething = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'tarSomethingRmTheSomething',
  description: 'If you run tar <X>.tar you should remove the <x>.tar file.',
  antecedent: {
    type: 'SC-TAR',
    children: [{
      type: 'SC-TAR-FILE',
      children: [{
        type: 'BASH-PATH',
        children: [{
          type: 'BASH-LITERAL',
          children: [{
            type: 'ABS-EXTENSION-TAR'
          }]
        }]
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATHS',
        children: [{
          type: 'SC-RM-PATH',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-EXTENSION-TAR'
            }]
          }]
        }]
      }]
    }
  },
  source: 'IMPLICIT --- no reason to keep around duplicates (the compressed version and the uncompressed version)'
};

export const gpgUseBatchFlag = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'gpgUseBatchFlag',
  description: 'Use the --batch flag when using gpg in a docker image.',
  antecedent: {
    type: 'SC-GPG',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-GPG-F-BATCH'
    }
  },
  source: 'https://github.com/docker-library/php/pull/747/commits/b99209cc078ebb7bf4614e870c2d69e0b3bed399'
};

export const gpgUseHaPools = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'gpgUseHaPools',
  description: 'Use ha.pool.* instead of pool.* with gpg.',
  antecedent: {
    type: 'SC-GPG',
    children: [{
      type: 'SC-GPG-KEYSERVER',
      bindHere: true,
      children: [{
        type: 'ABS-URL-POOL'
      }]
    }]
  },
  consequent: {
    matchAnyBound: {
      type: 'ABS-URL-HA-POOL'
    }
  },
  source: 'https://github.com/docker-library/httpd/pull/5/commits/63cd0ad57a12c76ff70d0f501f6c2f1580fa40f5'
};

export const ruleAptGetInstallUseY = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'ruleAptGetInstallUseY',
  description: 'Must use the -y flag to avoid apt-get install requesting user interaction.',
  antecedent: {
    type: 'SC-APT-GET-INSTALL',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-APT-GET-F-YES'
    }
  },
  source: 'IMPLICIT --- need to use non-interactive mode during image build except for very rare exceptions.'
};

export const ruleAptGetUpdatePrecedesInstall = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-PRECEDES-ANTECEDENT',
  name: 'ruleAptGetUpdatePrecedesInstall',
  description: 'apt-get update && apt-get install should happen in a single layer.',
  antecedent: {
    type: 'SC-APT-GET-INSTALL'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-APT-GET-UPDATE'
    }
  },
  source: 'IMPLICIT --- one of Hadolint\'s recommendations and a docker best practice.'
};

export const ruleAptGetInstallUseNoRec = {
  name: 'ruleAptGetInstallUseNoRec',
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  description: 'Use the --no-install-recommends flag to save layer space and avoid hidden dependencies.',
  antecedent: {
    type: 'SC-APT-GET-INSTALL',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-APT-GET-F-NO-INSTALL-RECOMMENDS'
    }
  },
  source: 'https://github.com/docker-library/openjdk/pull/193/commits/1d6fa42735002d61625d18378f1ca2df39cb26a0'
};

export const ruleAptGetInstallThenRemoveAptLists = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT',
  name: 'ruleAptGetInstallThenRemoveAptLists',
  description: 'rm -r /var/lib/apt/lists/* after apt-get install to save layer space.',
  antecedent: {
    type: 'SC-APT-GET-INSTALL'
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-RM',
      children: [{
        type: 'SC-RM-PATH',
        children: [{
          type: 'BASH-CONCAT',
          children: [{
            type: 'BASH-LITERAL',
            children: [{
              type: 'ABS-APT-LISTS'
            }, {
              type: 'ABS-PATH-VAR'
            }]
          }, {
            type: 'BASH-GLOB',
            children: [{
              type: 'ABS-GLOB-STAR'
            }]
          }]
        }]
      }]
    }
  },
  source: 'https://github.com/docker-library/ruby/pull/7/commits/950a673e59df846608f624ee55321d36ba1f89ba'
};

export const apkAddUseNoCache = {
  scope: 'INTRA-DIRECTIVE',
  kind: 'CONSEQUENT-FLAG-OF-ANTECEDENT',
  name: 'apkAddUseNoCache',
  description: 'Use the --no-cache flag when using apk add.',
  antecedent: {
    type: 'SC-APK-ADD',
    bindHere: true
  },
  consequent: {
    matchAnyBound: {
      type: 'SC-APK-F-NO-CACHE'
    }
  },
  source: 'https://github.com/docker-library/php/pull/228/commits/85d48c88b3e3dae303118275202327f14a8106f4'
};


export const RULES = [
  curlUseFlagF,
  npmCacheCleanAfterInstall,
  npmCacheCleanUseForce,
  rmRecursiveAfterMktempD,
  curlUseHttpsUrl,
  wgetUseHttpsUrl,
  pipUseNoCacheDir,
  mkdirUsrSrcThenRemove,
  configureShouldUseBuildFlag,
  gemUpdateSystemRmRootGem,
  sha256sumEchoOneSpaces,
  gemUpdateNoDocument,
  gpgVerifyAscRmAsc,
  yumInstallForceYes,
  yumInstallRmVarCacheYum,
  tarSomethingRmTheSomething,
  gpgUseBatchFlag,
  gpgUseHaPools,
  ruleAptGetInstallUseY,
  ruleAptGetUpdatePrecedesInstall,
  ruleAptGetInstallUseNoRec,
  ruleAptGetInstallThenRemoveAptLists,
  apkAddUseNoCache
];
