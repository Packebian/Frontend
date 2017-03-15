#!/bin/sh

# Restore backups and remove them
if [ -f app/scripts/services/env.js.bak ]; then
    cp app/scripts/services/env.js.bak app/scripts/services/env.js
    rm app/scripts/services/env.js.bak
fi
