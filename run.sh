#!/usr/bin/env bash
# change to the directory of the current file
cd "$( dirname "${BASH_SOURCE[0]}" )"

# spawn process and disown child
/bin/bash -c 'PORT=6006 node app' >/dev/null 2>&1 &
