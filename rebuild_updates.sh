#!/bin/bash
git fetch
LOCAL_HASH=$(git log --format=%H -1 master)
REMOTE_HASH=$(git log --format=%H -1 origin/master)
echo "This commit: $LOCAL_HASH"
echo "Remote commit: $REMOTE_HASH"

if [[ "$LOCAL_HASH" != "$REMOTE_HASH" ]]; then
    git pull
    cd ~/multi-jitsi
    source ~/.nvm/nvm.sh
    nvm use
    yarn build
fi
