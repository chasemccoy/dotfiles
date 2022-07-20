#!/bin/sh

echo "Setting up your Mac..."

# Check for Homebrew and install if we don't have it
if test ! $(which brew); then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Update Homebrew recipes
brew update

brew tap homebrew/bundle
brew tap homebrew/cask

# Binaries
brew install mas
brew install gh
brew install hub
brew install git

# Development
brew install imagemagick
brew install node
brew install yarn
brew install the-unarchiver

# Apps
brew install --cask imageoptim
brew install --cask 1password
brew install --cask figma
brew install --cask google-chrome
brew install --cask tower
brew install --cask visual-studio-code
brew install --cask spotify
mas install 775737590  # iA Writer
mas install 904280696  # Things
mas install 1529448980 # Reeder
mas install 1289583905 # Pixelmator
mas install 692867256  # Simplenote

# Create a Repositories directory
mkdir $HOME/Repositories
