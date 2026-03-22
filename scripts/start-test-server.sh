#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

readonly ENV="test"
source "$( dirname "${BASH_SOURCE[0]}" )/common.sh"

function main() {
    required_command npm
    pushd "$repository"

    get_environment_variables

    build_app
    npm start

    popd
}

main "$@"