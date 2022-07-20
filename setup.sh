#!/bin/sh

echo "Setting up your Mac..."

# Check for Homebrew and install if we don't have it
if test ! $(which brew); then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> $HOME/.zprofile
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Update Homebrew recipes
brew update

brew tap homebrew/bundle

# Binaries
brew install gh
brew install hub
brew install git

# Development
brew install imagemagick
brew install node
brew install yarn
brew install imageoptim
brew install the-unarchiver

# Create a Repositories directory
mkdir $HOME/Repositories

