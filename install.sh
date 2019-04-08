#!/usr/bin/env bash

# get system information
ostype="$(uname -s)"
cputype="$(uname -m)"

# Install .plist if on MacOS
if [ "$ostype" = 'Darwin' -a "$cputype" = 'x86_64' ]; then
  cat <<EOF > ~/Library/LaunchAgents/duckduckgoog.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<dict>
			<key>PORT</key>
			<string>6006</string>
		</dict>
		<key>Label</key>
		<string>Duckduckgoog</string>
		<key>ProgramArguments</key>
		<array>
			<string>$(which node)</string>
			<string>app.js</string>
		</array>
		<key>KeepAlive</key>
		<true/>
		<key>StandardOutPath</key>
		<string>/dev/null</string>
		<key>StandardErrorPath</key>
		<string>/dev/null</string>
		<key>WorkingDirectory</key>
		<string>$(pwd)</string>
	</dict>
</plist>
EOF
fi

