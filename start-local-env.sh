#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

readonly ENV="dev"
source "$( dirname "${BASH_SOURCE[0]}" )/scripts/common.sh"

check_node_version

required_command tmux
npm_ci

function main() {
    pushd "$repository"

    session="sisubot"

    tmux kill-session -t $session || true
    tmux start-server
    tmux new-session -d -s $session

    tmux select-pane -t 0
    tmux send-keys "./scripts/start-dev-server.sh" C-m
    tmux select-pane -t 0 -T "frontend dev"

    tmux set pane-border-status top
    tmux attach-session -t $session
    popd
}

main "$@"

