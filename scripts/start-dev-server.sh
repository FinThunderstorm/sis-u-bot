#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

readonly ENV="dev"
source "$( dirname "${BASH_SOURCE[0]}" )/common.sh"

function main() {
    required_command npm
    pushd "$repository"

    get_environment_variables

    npm run dev

    popd
}

main "$@"