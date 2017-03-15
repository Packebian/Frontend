#!/bin/sh

# Start by cleanning everything
./clean.sh

# Create a backup of the env service and replcae the value API_URL
cp app/scripts/services/env.js app/scripts/services/env.js.bak
sed -i -e 's#API_URL#'"$API_URL"'#g' app/scripts/services/env.js
