#!/bin/sh

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created in ./venv"
else
    echo "Virtual environment already exists in ./venv"
fi

# Get the parent process name (actual shell)
current_shell="$(ps -p $(ps -p $$ -o ppid=) -o comm=)"

# Trim whitespace
current_shell="$(echo "$current_shell" | xargs)"

if [ "$current_shell" = "bash" ]; then
    echo "Activating virtual environment for Bash..."
    . venv/bin/activate
    
    echo "[*] Pip installing nodeenv"
    pip install nodeenv

    echo "[*] Installing node through nodeenv"
    nodeenv -p --node=22.13.0

else
    echo "Detected shell: $current_shell"
    echo "To activate the virtual environment manually, run alternative for:"
    echo ". venv/bin/activate"
fi

