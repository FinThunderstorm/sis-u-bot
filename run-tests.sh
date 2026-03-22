#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

readonly ENV="test"
source "$( dirname "${BASH_SOURCE[0]}" )/scripts/common.sh"

function main() {
    required_command npm

    pushd "$repository"

    npm_ci

    echo "::group::Installing test tooling"
    npm run test:install
    echo "::endgroup::"

    get_environment_variables

    echo "::group::Running tests"
    npm run test
    echo "::endgroup::"

    popd
}

main "$@"